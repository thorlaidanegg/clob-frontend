import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Gavel, Loader2, X, Zap } from 'lucide-react'
import { useCreateMarket } from '@/api/markets'
import { ApiError } from '@/lib/http'
import { toast } from '@/components/Toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function CreateMarketModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const create = useCreateMarket()

  const [symbol, setSymbol] = useState('')
  const [price, setPrice] = useState('')
  const [auction, setAuction] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const marketID = symbol.trim().toUpperCase()
  const valid = /^[A-Z0-9]+-[A-Z0-9]+$/.test(marketID) && Number(price) > 0

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!valid) {
      setError('Enter a symbol like BASE-QUOTE and a positive opening price.')
      return
    }
    try {
      const m = await create.mutateAsync({ marketID, openingPrice: price, auction, seed: true })
      toast.success(
        auction
          ? `${m.marketID} created — opening auction clears in ~12s`
          : `${m.marketID} created and seeded`,
      )
      onClose()
      void navigate({ to: '/trade/$market', params: { market: m.marketID } })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to create market')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl border border-edge bg-panel shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-edge px-5 py-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Create a market</h2>
            <p className="text-xs text-muted">Spins up a live market and seeds it with liquidity.</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-zinc-100" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-5 p-5">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-wider text-muted">Symbol</label>
            <Input
              autoFocus
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="DOGE-USD"
              className="font-mono"
            />
            <span className="text-[11px] text-muted">Format: BASE-QUOTE (e.g. SOL-USD).</span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-wider text-muted">Opening price</label>
            <Input
              type="number"
              step="any"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="150.00"
              className="font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ModeCard
              active={!auction}
              onClick={() => setAuction(false)}
              icon={Zap}
              title="Continuous"
              desc="Opens instantly with a seeded book + trades."
            />
            <ModeCard
              active={auction}
              onClick={() => setAuction(true)}
              icon={Gavel}
              title="Opening auction"
              desc="Accumulates orders, then clears at one price."
            />
          </div>

          {error && <p className="text-sm text-down">{error}</p>}

          <div className="flex items-center justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={create.isPending} className="gap-2">
              {create.isPending && <Loader2 className="size-4 animate-spin" />}
              {create.isPending ? 'Creating…' : 'Create market'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ModeCard({
  active,
  onClick,
  icon: Icon,
  title,
  desc,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Zap
  title: string
  desc: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-start gap-1.5 rounded-lg border p-3 text-left transition-colors',
        active ? 'border-accent bg-accent/10' : 'border-edge bg-bg hover:border-edge-strong',
      )}
    >
      <Icon className={cn('size-4', active ? 'text-accent' : 'text-muted')} />
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-[11px] leading-snug text-muted">{desc}</span>
    </button>
  )
}
