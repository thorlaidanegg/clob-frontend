import { useEffect } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useMarkets } from '@/api/markets'

/** /trade with no market: send the trader to the first available market. */
export function TradeIndex() {
  const { data: markets, isLoading } = useMarkets()
  const navigate = useNavigate()
  const first = markets?.[0]?.marketID

  useEffect(() => {
    if (first) void navigate({ to: '/trade/$market', params: { market: first }, replace: true })
  }, [first, navigate])

  return (
    <div className="grid min-h-full place-items-center p-10 text-sm text-muted">
      {isLoading ? (
        'Loading markets…'
      ) : !first ? (
        <div className="text-center">
          <p>No markets are open yet.</p>
          <Link to="/markets" className="mt-2 inline-block text-accent hover:underline">
            Back to markets
          </Link>
        </div>
      ) : (
        'Opening market…'
      )}
    </div>
  )
}
