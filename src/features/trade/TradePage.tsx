import { useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Activity, CandlestickChart, ChevronDown, LineChart } from 'lucide-react'
import { useDepthSnapshot, useMarket, useMarkets, useRecentTrades } from '@/api/markets'
import { useOpenOrders, usePlaceOrder } from '@/api/orders'
import { usePortfolio } from '@/api/portfolio'
import { useLiveTrades, useOrderBook, type BookLevel } from '@/ws/stores'
import { OpenOrdersTable } from '@/components/OpenOrdersTable'
import { PositionsTable } from '@/components/PositionsTable'
import { toast } from '@/components/Toast'
import { PriceChart, type ChartKind } from './PriceChart'
import { formatDecimal, toNum } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Market, OrderType, Side, TIF, Trade } from '@/lib/types'

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

  // Order type + price are lifted so clicking an order-book level can prefill them.
  const [orderType, setOrderType] = useState<OrderType>('limit')
  const [orderPrice, setOrderPrice] = useState('')
  const pickPrice = (price: string) => {
    setOrderType('limit')
    setOrderPrice(price)
  }

  return (
    <div className="flex min-h-full flex-col font-mono lg:h-full lg:overflow-hidden">
      <MarketHeader market={market} cfg={cfg} lastPrice={lastPrice} bestBid={bestBid} bestAsk={bestAsk} pp={pp} />

      {/* Desktop: 3 columns. Mobile: stacked (chart → form → book) and scrollable. */}
      <div className="flex flex-col lg:min-h-0 lg:flex-1 lg:flex-row">
        <ChartPanel market={market} lastPrice={lastPrice} trades={trades} pp={pp} />
        <OrderBookPanel book={book} pp={pp} qp={qp} bestBid={bestBid} bestAsk={bestAsk} lastPrice={lastPrice} lastUp={lastUp} onPickPrice={pickPrice} />
        <TradesAndForm
          market={market}
          cfg={cfg}
          trades={trades}
          lastPrice={lastPrice}
          pp={pp}
          qp={qp}
          orderType={orderType}
          setOrderType={setOrderType}
          orderPrice={orderPrice}
          setOrderPrice={setOrderPrice}
        />
      </div>

      <BottomPanel />
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
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-y-2 border-b border-edge px-3 py-2.5 sm:px-4 sm:py-3">
      <div className="flex items-center gap-3 sm:gap-4">
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
        <span className="text-xl font-bold tabular-nums sm:text-2xl">
          {lastPrice ? formatDecimal(lastPrice, pp) : '—'}
        </span>
        <span className="hidden font-sans text-xs text-muted sm:inline">
          {cfg && `${cfg.baseAsset} / ${cfg.quoteAsset}`}
        </span>
      </div>
      <div className="flex items-center gap-4 font-sans text-xs sm:gap-6">
        <Stat label="Bid" value={bestBid ? formatDecimal(bestBid, pp) : '—'} className="text-up" />
        <Stat label="Ask" value={bestAsk ? formatDecimal(bestAsk, pp) : '—'} className="text-down" />
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

// ── Chart: candlestick / line, aggregated from the trade tape ─────────────────

function ChartPanel({
  market,
  lastPrice,
  trades,
  pp,
}: {
  market: string | undefined
  lastPrice: string | undefined
  trades: Trade[]
  pp: number
}) {
  const [kind, setKind] = useState<ChartKind>('line')

  return (
    <div className="flex h-72 w-full min-w-0 flex-col border-b border-edge bg-[#0d0d10] lg:order-1 lg:h-auto lg:w-[55%] lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between border-b border-edge px-4 py-2 font-sans">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-semibold">{market}</span>
          {lastPrice && (
            <span className="font-mono text-sm tabular-nums text-zinc-300">{formatDecimal(lastPrice, pp)}</span>
          )}
        </div>
        <div className="flex items-center gap-1 rounded-md border border-edge p-0.5">
          {(['candle', 'line'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={cn(
                'flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors',
                kind === k ? 'bg-panel-2 text-zinc-50' : 'text-muted hover:text-zinc-200',
              )}
            >
              {k === 'candle' ? <CandlestickChart className="size-3.5" /> : <LineChart className="size-3.5" />}
              {k === 'candle' ? 'Candles' : 'Line'}
            </button>
          ))}
        </div>
      </div>
      <div className="relative flex-1">
        {trades.length >= 1 ? (
          <PriceChart trades={trades} kind={kind} />
        ) : (
          <div className="grid size-full place-items-center font-sans text-sm text-muted">
            Waiting for trades…
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
  onPickPrice,
}: {
  book: { bids: BookLevel[]; asks: BookLevel[] }
  pp: number
  qp: number
  bestBid: string | undefined
  bestAsk: string | undefined
  lastPrice: string | undefined
  lastUp: boolean
  onPickPrice: (price: string) => void
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
    <div className="order-3 flex h-96 w-full min-w-0 flex-col border-b border-edge bg-bg lg:order-2 lg:h-auto lg:w-[22%] lg:border-b-0 lg:border-r">
      <div className="border-b border-edge px-3 py-2 font-sans text-[10px] uppercase tracking-wide text-muted">
        Order Book
      </div>
      <div className="flex justify-between px-3 py-1 font-sans text-[10px] uppercase text-muted">
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
            <BookRow key={`a${level.price}`} level={level} total={total} width={(total / maxCum) * 100} side="ask" pp={pp} qp={qp} onPick={onPickPrice} />
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
          <BookRow key={`b${l.price}`} level={l} total={bidCum[i]} width={(bidCum[i] / maxCum) * 100} side="bid" pp={pp} qp={qp} onPick={onPickPrice} />
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
  onPick,
}: {
  level: BookLevel
  total: number
  width: number
  side: Side
  pp: number
  qp: number
  onPick: (price: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onPick(level.price)}
      title={`Use ${formatDecimal(level.price, pp)} as limit price`}
      className="relative flex h-6 w-full items-center justify-between px-3 text-[13px] hover:bg-panel-2/60"
    >
      <div
        className={cn('absolute inset-y-0 right-0', side === 'ask' ? 'bg-down/15' : 'bg-up/15')}
        style={{ width: `${width}%` }}
      />
      <span className={cn('relative z-10 tabular-nums', side === 'ask' ? 'text-down' : 'text-up')}>
        {formatDecimal(level.price, pp)}
      </span>
      <span className="relative z-10 tabular-nums text-zinc-50">{formatDecimal(level.qty, qp)}</span>
      <span className="relative z-10 tabular-nums text-muted">{total.toFixed(qp > 2 ? 2 : qp)}</span>
    </button>
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
  orderType,
  setOrderType,
  orderPrice,
  setOrderPrice,
}: {
  market: string | undefined
  cfg: Market | undefined
  trades: { tradeID: string; price: string; qty: string; makerSide: Side; createdAt: string }[]
  lastPrice: string | undefined
  pp: number
  qp: number
  orderType: OrderType
  setOrderType: (t: OrderType) => void
  orderPrice: string
  setOrderPrice: (p: string) => void
}) {
  return (
    <div className="order-2 flex w-full min-w-0 flex-col border-b border-edge bg-panel lg:order-3 lg:w-[23%] lg:border-b-0">
      <OrderForm
        market={market}
        cfg={cfg}
        lastPrice={lastPrice}
        pp={pp}
        qp={qp}
        type={orderType}
        setType={setOrderType}
        price={orderPrice}
        setPrice={setOrderPrice}
      />
      <div className="flex h-64 flex-col border-t border-edge lg:h-auto lg:min-h-0 lg:flex-1">
        <div className="flex items-center justify-between border-b border-edge px-3 py-2">
          <span className="font-sans text-[11px] uppercase tracking-wide text-muted">Recent Trades</span>
          <Activity className="size-3.5 text-accent" />
        </div>
        <div className="flex justify-between px-3 py-1 font-sans text-[10px] uppercase text-muted">
          <span>Time</span>
          <span>Price</span>
          <span>Size</span>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          {trades.map((t) => (
            <div key={t.tradeID} className="flex h-6 items-center justify-between px-3 text-[13px]">
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
  type,
  setType,
  price,
  setPrice,
}: {
  market: string | undefined
  cfg: Market | undefined
  lastPrice: string | undefined
  pp: number
  qp: number
  type: OrderType
  setType: (t: OrderType) => void
  price: string
  setPrice: (p: string) => void
}) {
  const place = usePlaceOrder()
  const { data: portfolio } = usePortfolio()
  const [side, setSide] = useState<Side>('bid')
  const [stopPrice, setStopPrice] = useState('')
  const [qty, setQty] = useState('')
  const [tif, setTif] = useState<TIF>('GTC')

  const available = portfolio?.walletAvailable ?? '0'
  const quote = cfg?.quoteAsset ?? 'USDT'
  const base = cfg?.baseAsset ?? ''
  const effPrice = type === 'market' ? lastPrice ?? '0' : price || lastPrice || '0'
  const total = (toNum(effPrice) * toNum(qty)).toFixed(pp)

  // Selling is long-only: you can only sell base you actually hold.
  const heldBase = toNum(portfolio?.positions.find((p) => p.marketID === market)?.quantity)
  const availableBase = Math.max(heldBase, 0)
  const noInventory = side === 'ask' && availableBase <= 0

  function setPct(pct: number) {
    if (side === 'ask') {
      setQty(((availableBase * pct) / 100).toFixed(qp))
      return
    }
    const px = toNum(effPrice)
    if (px <= 0) return
    setQty((((toNum(available) * pct) / 100) / px).toFixed(qp))
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
        disabled={place.isPending || !market || noInventory}
        className={cn(
          'h-10 w-full rounded-sm text-sm font-bold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-50',
          side === 'bid' ? 'bg-accent' : 'bg-down',
        )}
      >
        {place.isPending
          ? '…'
          : noInventory
            ? `No ${base} to sell`
            : `${side === 'bid' ? 'Buy' : 'Sell'} ${base}`}
      </button>

      {place.isError && <p className="font-sans text-[11px] text-down">{(place.error as Error).message}</p>}
      <span className="font-sans text-[11px] text-muted">
        Available:{' '}
        {side === 'bid'
          ? `${formatDecimal(available, 2)} ${quote}`
          : `${formatDecimal(availableBase, qp)} ${base}`}
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

// ── Bottom: tabbed open orders / positions ───────────────────────────────────

function BottomPanel() {
  const { data: orders } = useOpenOrders()
  const { data: portfolio } = usePortfolio()
  const [tab, setTab] = useState<'orders' | 'positions'>('orders')
  const positionCount = (portfolio?.positions ?? []).filter((p) => toNum(p.quantity) !== 0).length

  const tabs = [
    { key: 'orders' as const, label: 'Open Orders', count: orders?.length ?? 0 },
    { key: 'positions' as const, label: 'Positions', count: positionCount },
  ]

  return (
    <div className="flex h-52 shrink-0 flex-col border-t border-edge bg-[#0d0d10]">
      <div className="flex items-center gap-6 border-b border-edge px-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              'py-2.5 font-sans text-xs font-bold transition-colors',
              tab === t.key ? 'border-b-2 border-accent text-zinc-50' : 'text-muted hover:text-zinc-200',
            )}
          >
            {t.label} {t.count ? `(${t.count})` : ''}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1">{tab === 'orders' ? <OpenOrdersTable /> : <PositionsTable />}</div>
    </div>
  )
}
