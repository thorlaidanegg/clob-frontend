import { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { useDepthSnapshot, useMarket, useRecentTrades } from '@/api/markets'
import { usePlaceOrder } from '@/api/orders'
import { useLiveTrades, useOrderBook } from '@/ws/stores'
import { formatDecimal } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Side } from '@/lib/types'

export function TradePage() {
  const params = useParams({ strict: false }) as { market?: string }
  const market = params.market
  const { data: cfg } = useMarket(market)
  const { data: snapshot } = useDepthSnapshot(market)
  const { data: seedTrades } = useRecentTrades(market)
  const book = useOrderBook(market, snapshot)
  const trades = useLiveTrades(market, seedTrades)
  const pp = cfg?.pricePrecision ?? 2
  const qp = cfg?.qtyPrecision ?? 2

  return (
    <div className="grid h-full grid-cols-[1fr_320px_300px] gap-px bg-edge">
      {/* Center: chart placeholder + recent trades */}
      <div className="flex min-w-0 flex-col bg-bg">
        <div className="border-b border-edge px-4 py-3">
          <h1 className="text-lg font-semibold tracking-tight">{market}</h1>
          <p className="text-xs text-muted">{cfg && `${cfg.baseAsset} / ${cfg.quoteAsset}`}</p>
        </div>
        <div className="grid flex-1 place-items-center text-sm text-muted">
          Price chart goes here (lightweight-charts)
        </div>
      </div>

      {/* Order book */}
      <div className="flex min-h-0 flex-col bg-bg text-xs">
        <div className="border-b border-edge px-3 py-2 font-medium text-muted">Order book</div>
        <div className="flex-1 overflow-auto">
          <Ladder levels={book.asks} side="ask" pp={pp} qp={qp} reverse />
          <div className="border-y border-edge px-3 py-1 text-center font-mono text-muted">
            {book.asks.at(-1)?.price ?? '—'}
          </div>
          <Ladder levels={book.bids} side="bid" pp={pp} qp={qp} />
        </div>
      </div>

      {/* Order form + trades tape */}
      <div className="flex min-h-0 flex-col bg-bg">
        <OrderForm market={market} pp={pp} />
        <div className="min-h-0 flex-1 overflow-auto border-t border-edge text-xs">
          <div className="px-3 py-2 font-medium text-muted">Recent trades</div>
          {trades.map((t) => (
            <div key={t.tradeID} className="flex justify-between px-3 py-0.5 font-mono">
              <span className={cn(t.makerSide === 'ask' ? 'text-up' : 'text-down')}>
                {formatDecimal(t.price, pp)}
              </span>
              <span className="text-muted">{formatDecimal(t.qty, qp)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Ladder(props: {
  levels: { price: string; qty: string }[]
  side: Side
  pp: number
  qp: number
  reverse?: boolean
}) {
  const rows = props.reverse ? [...props.levels].reverse() : props.levels
  return (
    <div>
      {rows.map((l) => (
        <div key={l.price} className="flex justify-between px-3 py-0.5 font-mono">
          <span className={props.side === 'bid' ? 'text-up' : 'text-down'}>
            {formatDecimal(l.price, props.pp)}
          </span>
          <span className="text-muted">{formatDecimal(l.qty, props.qp)}</span>
        </div>
      ))}
    </div>
  )
}

function OrderForm({ market, pp }: { market: string | undefined; pp: number }) {
  const place = usePlaceOrder()
  const [side, setSide] = useState<Side>('bid')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!market) return
    place.mutate(
      { marketID: market, side, orderType: 'limit', price, qty, tif: 'GTC' },
      { onSuccess: () => setQty('') },
    )
  }

  return (
    <form onSubmit={submit} className="space-y-2 p-3">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-edge">
        {(['bid', 'ask'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSide(s)}
            className={cn(
              'py-1.5 text-sm font-medium',
              side === s
                ? s === 'bid'
                  ? 'bg-up-soft text-up'
                  : 'bg-down-soft text-down'
                : 'bg-panel text-muted',
            )}
          >
            {s === 'bid' ? 'Buy' : 'Sell'}
          </button>
        ))}
      </div>
      <input
        inputMode="decimal"
        placeholder={`Price (${pp}dp)`}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full rounded-md border border-edge bg-panel-2 px-3 py-2 text-sm font-mono outline-none"
      />
      <input
        inputMode="decimal"
        placeholder="Quantity"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="w-full rounded-md border border-edge bg-panel-2 px-3 py-2 text-sm font-mono outline-none"
      />
      <button
        type="submit"
        disabled={place.isPending}
        className={cn(
          'w-full rounded-md py-2 text-sm font-semibold text-black disabled:opacity-50',
          side === 'bid' ? 'bg-up' : 'bg-down',
        )}
      >
        {side === 'bid' ? 'Buy' : 'Sell'} {market}
      </button>
      {place.isError && <p className="text-xs text-down">{(place.error as Error).message}</p>}
    </form>
  )
}
