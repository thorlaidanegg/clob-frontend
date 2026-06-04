import { Link } from '@tanstack/react-router'
import { Activity } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="relative flex min-h-full flex-col">
      <header className="flex h-14 items-center gap-2 px-6">
        <Activity className="size-5 text-accent" />
        <span className="font-semibold tracking-tight">clob</span>
        <div className="ml-auto flex items-center gap-3 text-sm">
          <Link to="/login" className="text-muted hover:text-zinc-100">
            Log in
          </Link>
          <Link
            to="/login"
            className="rounded-md bg-accent px-3 py-1.5 font-medium text-black hover:opacity-90"
          >
            Start trading free
          </Link>
        </div>
      </header>

      <section className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Trade like it&apos;s real.
          <br />
          <span className="text-accent">Risk nothing.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          A full crypto-style exchange powered by a real matching engine — live order books, real
          fills, real PnL. Just with virtual credits instead of real money.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-md bg-accent px-5 py-2.5 font-medium text-black hover:opacity-90"
          >
            Start trading free
          </Link>
          <Link
            to="/leaderboard"
            className="rounded-md border border-edge px-5 py-2.5 font-medium text-zinc-100 hover:bg-panel"
          >
            View leaderboard
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted">No deposit · No KYC · Real engine, not a simulation.</p>
      </section>
    </div>
  )
}
