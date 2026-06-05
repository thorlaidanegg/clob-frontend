/**
 * Realtime stores for high-frequency data (order book, trades). These live
 * OUTSIDE React state on purpose: updates land on a mutable object and notify
 * subscribers at most once per animation frame, so a book ticking 50×/sec stays
 * at 60fps. Components read them via useSyncExternalStore — zero state library.
 */
import { useEffect, useSyncExternalStore } from 'react'
import { wsClient, type ServerMessage } from './client'
import { toNum } from '@/lib/format'
import type { BookSnapshot, Side, Trade } from '@/lib/types'

export interface BookLevel {
  price: string
  qty: string
}
export interface BookView {
  bids: BookLevel[]
  asks: BookLevel[]
}
const EMPTY_BOOK: BookView = { bids: [], asks: [] }
const EMPTY_TRADES: Trade[] = []

// The WS feed forwards raw engine events, which encode side as an int (1=bid,
// 2=ask) — unlike the REST DTOs which use 'bid'/'ask'. Normalize both shapes.
export function wireSide(s: Side | number | undefined): Side {
  return s === 'bid' || s === 1 ? 'bid' : 'ask'
}

interface DepthUpdate {
  side: Side | number
  price: string
  newTotalQty: string
  updateType?: string
}

// ── Order book ───────────────────────────────────────────────────────────────

class OrderBookStore {
  private readonly bids = new Map<string, string>()
  private readonly asks = new Map<string, string>()
  private view: BookView = EMPTY_BOOK
  private readonly subs = new Set<() => void>()
  private dirty = false
  private raf = 0
  depth = 20

  subscribe = (cb: () => void): (() => void) => {
    this.subs.add(cb)
    return () => this.subs.delete(cb)
  }
  getSnapshot = (): BookView => this.view

  seed(s: BookSnapshot): void {
    this.bids.clear()
    this.asks.clear()
    for (const l of s.bids) this.bids.set(l.price, l.totalQty)
    for (const l of s.asks) this.asks.set(l.price, l.totalQty)
    this.schedule()
  }

  apply(u: DepthUpdate): void {
    const m = wireSide(u.side) === 'bid' ? this.bids : this.asks
    if (u.updateType === 'delete' || toNum(u.newTotalQty) === 0) m.delete(u.price)
    else m.set(u.price, u.newTotalQty)
    this.schedule()
  }

  private schedule(): void {
    this.dirty = true
    if (this.raf) return
    this.raf = requestAnimationFrame(() => {
      this.raf = 0
      if (this.dirty) this.flush()
    })
  }

  private flush(): void {
    this.dirty = false
    const bids = [...this.bids.entries()]
      .map(([price, qty]) => ({ price, qty }))
      .sort((a, b) => toNum(b.price) - toNum(a.price))
      .slice(0, this.depth)
    const asks = [...this.asks.entries()]
      .map(([price, qty]) => ({ price, qty }))
      .sort((a, b) => toNum(a.price) - toNum(b.price))
      .slice(0, this.depth)
    this.view = { bids, asks }
    this.subs.forEach((s) => s())
  }
}

// ── Trades tape ──────────────────────────────────────────────────────────────

class TradesStore {
  private items: Trade[] = EMPTY_TRADES
  private readonly subs = new Set<() => void>()
  max = 60

  subscribe = (cb: () => void): (() => void) => {
    this.subs.add(cb)
    return () => this.subs.delete(cb)
  }
  getSnapshot = (): Trade[] => this.items

  seed(ts: Trade[]): void {
    this.items = ts.slice(0, this.max)
    this.subs.forEach((s) => s())
  }
  push(t: Trade): void {
    this.items = [t, ...this.items].slice(0, this.max)
    this.subs.forEach((s) => s())
  }
}

// ── per-market store registries ──

const books = new Map<string, OrderBookStore>()
const tapes = new Map<string, TradesStore>()

function bookFor(market: string): OrderBookStore {
  let b = books.get(market)
  if (!b) {
    b = new OrderBookStore()
    books.set(market, b)
  }
  return b
}
function tapeFor(market: string): TradesStore {
  let t = tapes.get(market)
  if (!t) {
    t = new TradesStore()
    tapes.set(market, t)
  }
  return t
}

const noopSub = (_cb: () => void): (() => void) => () => {}

/** Live order book for a market, seeded from a REST snapshot, updated over WS. */
export function useOrderBook(market: string | undefined, seed?: BookSnapshot): BookView {
  const store = market ? bookFor(market) : null
  useEffect(() => {
    if (!market || !store) return
    if (seed) store.seed(seed)
    const offSub = wsClient.subscribe(`depth:${market}`)
    const offMsg = wsClient.onMessage((msg: ServerMessage) => {
      if (msg.channel === `depth:${market}` && msg.data) store.apply(msg.data as DepthUpdate)
    })
    return () => {
      offSub()
      offMsg()
    }
  }, [market, store, seed])

  return useSyncExternalStore(
    store ? store.subscribe : noopSub,
    store ? store.getSnapshot : () => EMPTY_BOOK,
    () => EMPTY_BOOK,
  )
}

/** Map a raw TradeExecuted WS event (numeric makerSide, ns timestamp) into the
 * REST Trade shape the tape renders. */
function normalizeWsTrade(data: unknown): Trade {
  const d = data as Record<string, unknown>
  const tsNs = typeof d.timestamp === 'number' ? d.timestamp : 0
  return {
    tradeID: String(d.tradeID ?? crypto.randomUUID()),
    marketID: String(d.marketID ?? ''),
    makerOrderID: String(d.makerOrderID ?? ''),
    takerOrderID: String(d.takerOrderID ?? ''),
    makerUserID: String(d.makerUserID ?? ''),
    takerUserID: String(d.takerUserID ?? ''),
    makerSide: wireSide(d.makerSide as Side | number | undefined),
    price: String(d.price ?? '0'),
    qty: String(d.qty ?? '0'),
    makerFee: String(d.makerFee ?? '0'),
    takerFee: String(d.takerFee ?? '0'),
    feeCurrency: String(d.feeCurrency ?? ''),
    createdAt: tsNs ? new Date(tsNs / 1e6).toISOString() : new Date().toISOString(),
  }
}

/** Live trades tape for a market, seeded from REST, appended over WS. */
export function useLiveTrades(market: string | undefined, seed?: Trade[]): Trade[] {
  const store = market ? tapeFor(market) : null
  useEffect(() => {
    if (!market || !store) return
    if (seed) store.seed(seed)
    const offSub = wsClient.subscribe(`trades:${market}`)
    const offMsg = wsClient.onMessage((msg: ServerMessage) => {
      if (msg.channel === `trades:${market}` && msg.data) store.push(normalizeWsTrade(msg.data))
    })
    return () => {
      offSub()
      offMsg()
    }
  }, [market, store, seed])

  return useSyncExternalStore(
    store ? store.subscribe : noopSub,
    store ? store.getSnapshot : () => EMPTY_TRADES,
    () => EMPTY_TRADES,
  )
}
