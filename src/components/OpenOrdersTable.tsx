import { useMemo } from 'react'
import { X } from 'lucide-react'
import { useMarkets } from '@/api/markets'
import { useCancelOrder, useOpenOrders } from '@/api/orders'
import { toast } from '@/components/Toast'
import { rawToDecimal } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Order } from '@/lib/types'

const COLS = ['Market', 'Type', 'Side', 'Price', 'Qty', 'Filled', 'TIF', 'Status', '']

/** Live open-orders table with inline cancel. Used on the Trade terminal and
 * the Portfolio page. Self-contained: fetches orders + market precision. */
export function OpenOrdersTable({ compact = false }: { compact?: boolean }) {
  const { data: orders, isLoading } = useOpenOrders()
  const { data: markets } = useMarkets()
  const cancel = useCancelOrder()

  const prec = useMemo(() => {
    const map = new Map<string, { pp: number; qp: number }>()
    for (const m of markets ?? []) map.set(m.marketID, { pp: m.pricePrecision, qp: m.qtyPrecision })
    return map
  }, [markets])

  return (
    <div className="h-full overflow-auto">
      <table className="w-full min-w-160 text-left text-[13px]">
        <thead className="sticky top-0 bg-[#0d0d10]">
          <tr className="font-sans text-[11px] uppercase tracking-wide text-muted">
            {COLS.map((h, i) => (
              <th key={h || i} className={cn('px-4 py-2 font-medium', i >= 3 && i <= 5 && 'text-right')}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono">
          {isLoading && (
            <tr>
              <td colSpan={COLS.length} className="px-4 py-6 text-center font-sans text-muted">
                Loading…
              </td>
            </tr>
          )}
          {!isLoading && (orders?.length ?? 0) === 0 && (
            <tr>
              <td colSpan={COLS.length} className="px-4 py-6 text-center font-sans text-muted">
                No open orders.
              </td>
            </tr>
          )}
          {orders?.map((o) => (
            <Row
              key={o.orderID}
              o={o}
              prec={prec.get(o.marketID) ?? { pp: 2, qp: 4 }}
              onCancel={() =>
                cancel.mutate(o.orderID, {
                  onSuccess: () => toast.info(`Order canceled · ${o.marketID}`),
                  onError: (e) => toast.error(e instanceof Error ? e.message : 'Cancel failed'),
                })
              }
              canceling={cancel.isPending}
              compact={compact}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Row({
  o,
  prec,
  onCancel,
  canceling,
  compact,
}: {
  o: Order
  prec: { pp: number; qp: number }
  onCancel: () => void
  canceling: boolean
  compact: boolean
}) {
  const buy = o.side === 'bid'
  const filledPct = o.origQty > 0 ? Math.round((o.filledQty / o.origQty) * 100) : 0
  return (
    <tr className="border-t border-edge hover:bg-panel-2/40">
      <td className="px-4 py-1.5 font-sans font-medium text-zinc-50">{o.marketID}</td>
      <td className="px-4 py-1.5 capitalize text-muted">{o.orderType.replace('_', ' ')}</td>
      <td className="px-4 py-1.5">
        <span className={cn('rounded-sm px-2 py-0.5', buy ? 'bg-up/15 text-up' : 'bg-down/15 text-down')}>
          {buy ? 'Buy' : 'Sell'}
        </span>
      </td>
      <td className="px-4 py-1.5 text-right tabular-nums text-zinc-50">
        {o.price > 0 ? rawToDecimal(o.price, prec.pp) : '—'}
      </td>
      <td className="px-4 py-1.5 text-right tabular-nums text-zinc-50">{rawToDecimal(o.origQty, prec.qp)}</td>
      <td className="px-4 py-1.5 text-right tabular-nums text-muted">{filledPct}%</td>
      <td className={cn('px-4 py-1.5 text-muted', compact && 'hidden')}>{o.tif}</td>
      <td className="px-4 py-1.5">
        <span className="rounded-sm bg-amber-400/15 px-2 py-0.5 capitalize text-amber-400">{o.status}</span>
      </td>
      <td className="px-4 py-1.5 text-right">
        <button
          onClick={onCancel}
          disabled={canceling}
          title="Cancel order"
          className="text-down transition-opacity hover:opacity-70 disabled:opacity-40"
        >
          <X className="size-3.5" />
        </button>
      </td>
    </tr>
  )
}
