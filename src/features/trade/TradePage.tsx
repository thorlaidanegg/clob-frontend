import { useMemo, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Activity, ChevronDown } from 'lucide-react'
import { useDepthSnapshot, useMarket, useMarkets, useRecentTrades } from '@/api/markets'
import { useOpenOrders, usePlaceOrder } from '@/api/orders'
import { usePortfolio } from '@/api/portfolio'
import { useLiveTrades, useOrderBook, type BookLevel } from '@/ws/stores'
import { OpenOrdersTable } from '@/components/OpenOrdersTable'
import { toast } from '@/components/Toast'
import { formatDecimal, toNum } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Market, OrderType, Side, TIF } from '@/lib/types'

export function TradePage() {
  const params = useParams({ strict: false }) as { market?: string }
  const market = params.market
  const { data: cfg } = useMarket(market)
  const { data: snapshot } = useDepthSnapshot(market)
  const { data: seedTrades } = useRecentTrades(market)
  const book = useOrderBook(market, snapshot)
  const trades = useLiveTrades(market, seedTrades)
  const pp = cfg?.pricePrecision ?? 2
  const qp = cfg?.qtyPrecision ?? 4

  const bestBid = book.bids[0]?.price
  const bestAsk = book.asks[0]?.price
  const lastPrice = trades[0]?.price ?? bestBid ?? bestAsk
  // Last trade up if the resting maker was an ask (i.e. a buyer took liquidity).
  const lastUp = trades.length === 0 || trades[0].makerSide === 'ask'

  return (
    <div className="flex h-full flex-col font-mono">
      <MarketHeader market={market} cfg={cfg} lastPrice={lastPrice} bestBid={bestBid} bestAsk={bestAsk} pp={pp} />

      <div className="flex min-h-0 flex-1">
        <ChartPanel market={market} lastPrice={lastPrice} trades={trades} pp={pp} />
        <OrderBookPanel book={book} pp={pp} qp={qp} bestBid={bestBid} bestAsk={bestAsk} lastPrice={lastPrice} lastUp={lastUp} />
        <TradesAndForm market={market} cfg={cfg} trades={trades} lastPrice={lastPrice} pp={pp} qp={qp} />
      </div>

      <OpenOrdersPanel />
    </div>
  )
}

// ── Header: market switcher + last price + spread ────────────────────────────

function MarketHeader({
  market,
  cfg,
  lastPrice,
  bestBid,
  bestAsk,
  pp,
}: {
  market: string | undefined
  cfg: Market | undefined
  lastPrice: string | undefined
  bestBid: string | undefined
  bestAsk: string | undefined
  pp: number
}) {
  const { data: markets } = useMarkets()
  const navigate = useNavigate()
  const spread = bestBid && bestAsk ? (toNum(bestAsk) - toNum(bestBid)).toFixed(pp) : '—'

  return (
    <div className="flex shrink-0 items-center justify-between border-b border-edge px-4 py-3">
      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            value={market ?? ''}
            onChange={(e) =>
              void navigate({ to: '/trade/$market', params: { market: e.target.value } })
            }
            className="appearance-none rounded-full border border-edge bg-panel-2 py-1 pl-3 pr-8 text-xs font-bold text-zinc-50 outline-none"
          >
            {markets?.map((m) => (
              <option key={m.marketID} value={m.marketID}>
                {m.marketID}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-muted" />
        </div>
        <span className="text-2xl font-bold tabular-nums">
          {lastPrice ? formatDecimal(lastPrice, pp) : '—'}
        </span>
        <span className="font-sans text-xs text-muted">
          {cfg && `${cfg.baseAsset} / ${cfg.quoteAsset}`}
        </span>
      </div>
      <div className="flex items-center gap-6 font-sans text-xs">
        <Stat label="Best Bid" value={bestBid ? formatDecimal(bestBid, pp) : '—'} className="text-up" />
        <Stat label="Best Ask" value={bestAsk ? formatDecimal(bestAsk, pp) : '—'} className="text-down" />
        <Stat label="Spread" value={spread} />
      </div>
    </div>
  )
}

function Stat({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase text-muted">{label}</span>
      <span className={cn('font-mono tabular-nums', className)}>{value}</span>
    </div>
  )
}

// ── Chart (no OHLC feed yet → sparkline from the trade tape) ──────────────────

function ChartPanel({
  market,
  lastPrice,
  trades,
  pp,
}: {
  market: string | undefined
  lastPrice: string | undefined
  trades: { price: string }[]
  pp: number
}) {
  const points = useMemo(() => {
    const xs = trades.slice(0, 80).map((t) => toNum(t.price)).reverse()
    if (xs.length < 2) return ''
    const min = Math.min(...xs)
    const max = Math.max(...xs)
    const span = max - min || 1
    const w = 100
    const h = 100
    return xs
      .map((v, i) => `${(i / (xs.length - 1)) * w},${h - ((v - min) / span) * h}`)
      .join(' ')
  }, [trades])

  const up = trades.length >= 2 && toNum(trades[0].price) >= toNum(trades[trades.length - 1].price)

  return (
    <div className="flex w-[55%] min-w-0 flex-col border-r border-edge bg-[#0d0d10]">
      <div className="flex items-baseline gap-3 border-b border-edge px-4 py-2 font-sans">
        <span className="text-sm font-semibold">{market}</span>
        <span className="text-xs text-muted">Live mid-price tape</span>
      </div>
      <div className="relative flex-1">
        {points ? (
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
            <polyline
              points={points}
              fill="none"
              stroke={up ? 'var(--color-up)' : 'var(--color-down)'}
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ) : (
          <div className="grid size-full place-items-center font-sans text-sm text-muted">
            Waiting for trades…
          </div>
        )}
        {lastPrice && (
          <div className="absolute right-3 top-3 font-mono text-xs text-muted">
            {formatDecimal(lastPrice, pp)}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Order book with cumulative depth bars ────────────────────────────────────

function OrderBookPanel({
  book,
  pp,
  qp,
  bestBid,
  bestAsk,
  lastPrice,
  lastUp,
}: {
  book: { bids: BookLevel[]; asks: BookLevel[] }
  pp: number
  qp: number
  bestBid: string | undefined
  bestAsk: string | undefined
  lastPrice: string | undefined
  lastUp: boolean
}) {
  const asks = book.asks.slice(0, 12)
  const bids = book.bids.slice(0, 12)

  // Cumulative totals for the depth bars (max over both sides for a shared scale).
  const cum = (levels: BookLevel[]) => {
    let run = 0
    return levels.map((l) => {
      run += toNum(l.qty)
      return run
    })
  }
  const askCum = cum(asks)
  const bidCum = cum(bids)
  const maxCum = Math.max(askCum.at(-1) ?? 0, bidCum.at(-1) ?? 0, 1)
  const spread = bestBid && bestAsk ? (toNum(bestAsk) - toNum(bestBid)).toFixed(pp) : '—'

  return (
    <div className="flex w-[22%] min-w-0 flex-col border-r border-edge bg-bg">
      <div className="border-b border-edge px-3 py-2 font-sans text-[10px] uppercase tracking-wide text-muted">
        Order Book
      </div>
      <div className="flex justify-between px-3 py-1 font-sans text-[9px] uppercase text-muted">
        <span>Price</span>
        <span>Size</span>
        <span>Total</span>
      </div>
      {/* Asks: bottom-aligned so the best ask sits right on the spread line, with
          any empty space pushed to the top (not between asks and the spread). */}
      <div className="flex flex-1 flex-col justify-end overflow-hidden">
        {asks
          .map((l, i) => ({ level: l, total: askCum[i] }))
          .reverse()
          .map(({ level, total }) => (
            <BookRow key={`a${level.price}`} level={level} total={total} width={(total / maxCum) * 100} side="ask" pp={pp} qp={qp} />
          ))}
      </div>
      <div className="flex items-center justify-between border-y border-edge bg-panel-2/40 px-3 py-1.5">
        <span className={cn('font-mono text-sm font-bold tabular-nums', lastUp ? 'text-up' : 'text-down')}>
          {lastPrice ? formatDecimal(lastPrice, pp) : '—'}
        </span>
        <span className="font-sans text-[10px] text-muted">
          spread <span className="font-mono text-zinc-300">{spread}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        {bids.map((l, i) => (
          <BookRow key={`b${l.price}`} level={l} total={bidCum[i]} width={(bidCum[i] / maxCum) * 100} side="bid" pp={pp} qp={qp} />
        ))}
      </div>
    </div>
  )
}

function BookRow({
  level,
  total,
  width,
  side,
  pp,
  qp,
}: {
  level: BookLevel
  total: number
  width: number
  side: Side
  pp: number
  qp: number
}) {
  return (
    <div className="relative flex h-5.5 items-center justify-between px-3 text-[11px]">
      <div
        className={cn('absolute inset-y-0 right-0', side === 'ask' ? 'bg-down/15' : 'bg-up/15')}
        style={{ width: `${width}%` }}
      />
      <span className={cn('relative z-10 tabular-nums', side === 'ask' ? 'text-down' : 'text-up')}>
        {formatDecimal(level.price, pp)}
      </span>
      <span className="relative z-10 tabular-nums text-zinc-50">{formatDecimal(level.qty, qp)}</span>
      <span className="relative z-10 tabular-nums text-muted">{total.toFixed(qp > 2 ? 2 : qp)}</span>
    </div>
  )
}

// ── Right column: order form + recent trades ─────────────────────────────────

function TradesAndForm({
  market,
  cfg,
  trades,
  lastPrice,
  pp,
  qp,
}: {
  market: string | undefined
  cfg: Market | undefined
  trades: { tradeID: string; price: string; qty: string; makerSide: Side; createdAt: string }[]
  lastPrice: string | undefined
  pp: number
  qp: number
}) {
  return (
    <div className="flex w-[23%] min-w-0 flex-col bg-panel">
      <OrderForm market={market} cfg={cfg} lastPrice={lastPrice} pp={pp} qp={qp} />
      <div className="flex min-h-0 flex-1 flex-col border-t border-edge">
        <div className="flex items-center justify-between border-b border-edge px-3 py-2">
          <span className="font-sans text-[10px] uppercase tracking-wide text-muted">Recent Trades</span>
          <Activity className="size-3 text-accent" />
        </div>
        <div className="flex justify-between px-3 py-1 font-sans text-[9px] uppercase text-muted">
          <span>Time</span>
          <span>Price</span>
          <span>Size</span>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          {trades.map((t) => (
            <div key={t.tradeID} className="flex h-5 items-center justify-between px-3 text-[10px]">
              <span className="text-muted">{timeOf(t.createdAt)}</span>
              <span className={cn('tabular-nums', t.makerSide === 'ask' ? 'text-up' : 'text-down')}>
                {formatDecimal(t.price, pp)}
              </span>
              <span className="tabular-nums text-zinc-50">{formatDecimal(t.qty, qp)}</span>
            </div>
          ))}
          {trades.length === 0 && (
            <div className="px-3 py-6 text-center font-sans text-xs text-muted">No trades yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}

function timeOf(iso: string): string {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '--:--:--' : d.toLocaleTimeString('en-US', { hour12: false })
}

const ORDER_TABS: { key: OrderType; label: string }[] = [
  { key: 'limit', label: 'Limit' },
  { key: 'market', label: 'Market' },
  { key: 'stop', label: 'Stop' },
]

function OrderForm({
  market,
  cfg,
  lastPrice,
  pp,
  qp,
}: {
  market: string | undefined
  cfg: Market | undefined
  lastPrice: string | undefined
  pp: number
  qp: number
}) {
  const place = usePlaceOrder()
  const { data: portfolio } = usePortfolio()
  const [side, setSide] = useState<Side>('bid')
  const [type, setType] = useState<OrderType>('limit')
  const [price, setPrice] = useState('')
  const [stopPrice, setStopPrice] = useState('')
  const [qty, setQty] = useState('')
  const [tif, setTif] = useState<TIF>('GTC')

  const available = portfolio?.walletAvailable ?? '0'
  const quote = cfg?.quoteAsset ?? 'USDT'
  const base = cfg?.baseAsset ?? ''
  const effPrice = type === 'market' ? lastPrice ?? '0' : price || lastPrice || '0'
  const total = (toNum(effPrice) * toNum(qty)).toFixed(pp)

  function setPct(pct: number) {
    const px = toNum(effPrice)
    if (px <= 0) return
    if (side === 'bid') {
      const budget = (toNum(available) * pct) / 100
      setQty((budget / px).toFixed(qp))
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!market) return
    const verb = side === 'bid' ? 'Buy' : 'Sell'
    place.mutate(
      {
        marketID: market,
        side,
        orderType: type,
        price: type === 'market' ? undefined : price,
        stopPrice: type === 'stop' ? stopPrice : undefined,
        qty,
        // Market orders can't rest — let the backend default them to IOC.
        tif: type === 'market' ? undefined : tif,
      },
      {
        onSuccess: (res) => {
          setQty('')
          toast.success(`${verb} ${qty} ${base} — order ${res.status}`)
        },
        onError: (err) => toast.error(err instanceof Error ? err.message : 'Order failed'),
      },
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 p-3">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setSide('bid')}
          className={cn(
            'rounded-sm py-2 text-sm font-bold transition-colors',
            side === 'bid' ? 'bg-accent text-black' : 'border border-edge text-muted',
          )}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setSide('ask')}
          className={cn(
            'rounded-sm py-2 text-sm font-bold transition-colors',
            side === 'ask' ? 'bg-down text-black' : 'border border-down/40 text-down',
          )}
        >
          Sell
        </button>
      </div>

      <div className="flex items-center gap-4 border-b border-edge font-sans">
        {ORDER_TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setType(t.key)}
            className={cn(
              'pb-2 text-xs font-bold transition-colors',
              type === t.key ? 'border-b-2 border-accent text-zinc-50' : 'text-muted',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {type === 'stop' && (
        <Field label="Stop Price" suffix={quote}>
          <input
            inputMode="decimal"
            value={stopPrice}
            onChange={(e) => setStopPrice(e.target.value)}
            placeholder="0.00"
            className="w-full bg-transparent text-sm outline-none"
          />
        </Field>
      )}

      <Field label="Price" suffix={quote} muted={type === 'market'}>
        <input
          inputMode="decimal"
          value={type === 'market' ? '' : price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={type === 'market'}
          placeholder={type === 'market' ? 'Market' : formatDecimal(lastPrice ?? '0', pp)}
          className="w-full bg-transparent text-sm outline-none disabled:text-muted"
        />
      </Field>

      <Field label="Quantity" suffix={base}>
        <input
          inputMode="decimal"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="0.0000"
          className="w-full bg-transparent text-sm outline-none"
        />
      </Field>

      <div className="flex gap-1.5">
        {[25, 50, 75, 100].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPct(p)}
            className="flex-1 rounded-sm border border-edge py-1 text-[10px] text-muted transition-colors hover:text-zinc-100"
          >
            {p}%
          </button>
        ))}
      </div>

      <Field label="Total" suffix={quote} muted>
        <span className="text-sm tabular-nums text-muted">{total}</span>
      </Field>

      <Field label="TIF">
        <select
          value={tif}
          onChange={(e) => setTif(e.target.value as TIF)}
          className="w-full appearance-none bg-transparent text-xs text-zinc-50 outline-none"
        >
          {(['GTC', 'IOC', 'FOK', 'DAY'] as const).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        disabled={place.isPending || !market}
        className={cn(
          'h-10 w-full rounded-sm text-sm font-bold text-black transition-opacity disabled:opacity-50',
          side === 'bid' ? 'bg-accent' : 'bg-down',
        )}
      >
        {place.isPending ? '…' : `${side === 'bid' ? 'Buy' : 'Sell'} ${base}`}
      </button>

      {place.isError && <p className="font-sans text-[11px] text-down">{(place.error as Error).message}</p>}
      <span className="font-sans text-[11px] text-muted">
        Available: {formatDecimal(available, 2)} {quote}
      </span>
    </form>
  )
}

function Field({
  label,
  suffix,
  muted,
  children,
}: {
  label: string
  suffix?: string
  muted?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-sans text-[11px] uppercase text-muted">{label}</span>
      <div
        className={cn(
          'flex items-center justify-between gap-2 rounded-sm border px-2 py-2',
          muted ? 'border-edge bg-panel-2/40' : 'border-edge-strong bg-bg',
        )}
      >
        {children}
        {suffix && <span className="shrink-0 text-xs text-muted">{suffix}</span>}
      </div>
    </div>
  )
}

// ── Bottom: open orders ──────────────────────────────────────────────────────

function OpenOrdersPanel() {
  const { data: orders } = useOpenOrders()

  return (
    <div className="flex h-52 shrink-0 flex-col border-t border-edge bg-[#0d0d10]">
      <div className="flex items-center gap-6 border-b border-edge px-4">
        <span className="border-b-2 border-accent py-2.5 font-sans text-xs font-bold text-zinc-50">
          Open Orders {orders?.length ? `(${orders.length})` : ''}
        </span>
      </div>
      <div className="min-h-0 flex-1">
        <OpenOrdersTable />
      </div>
    </div>
  )
}
