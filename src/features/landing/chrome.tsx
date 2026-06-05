import { Link } from '@tanstack/react-router'
import { CandlestickChart } from 'lucide-react'
import { Button } from '@/components/ui/button'

/** The public GitHub repo backing the bot SDK — the "docs" target. */
export const BOT_REPO_URL = 'https://github.com/thorlaidanegg/clob-bot'

/** GitHub mark — lucide dropped its brand icons, so we inline it. */
export function GithubIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.33-1.73-1.33-1.73-1.09-.73.08-.71.08-.71 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 3-.39c1.02 0 2.05.13 3 .39 2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.22.68.83.56A11.79 11.79 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
    </svg>
  )
}

export function Wordmark({ className = 'size-7' }: { className?: string }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className={`flex ${className} items-center justify-center rounded-md bg-gradient-to-br from-accent to-emerald-400 shadow-[0_0_20px_-4px_rgba(22,199,132,0.6)]`}>
        <CandlestickChart className="size-[60%] text-black" />
      </div>
      <span className="text-base font-bold tracking-tight">PaperEx</span>
    </Link>
  )
}

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge/60 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Wordmark />
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="/#features" className="transition-colors hover:text-zinc-100">Features</a>
          <a href="/#api" className="transition-colors hover:text-zinc-100">API</a>
          <Link to="/bots" className="transition-colors hover:text-zinc-100">Bots</Link>
          <Link to="/leaderboard" className="transition-colors hover:text-zinc-100">Leaderboard</Link>
        </nav>
        <div className="flex items-center gap-2">
          <a href={BOT_REPO_URL} target="_blank" rel="noreferrer" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="gap-1.5 text-zinc-300">
              <GithubIcon /> GitHub
            </Button>
          </a>
          <Link to="/login">
            <Button size="sm">Start trading</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-edge bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <Wordmark className="size-6" />
        <nav className="flex items-center gap-6 text-sm text-muted">
          <a href="/#features" className="hover:text-zinc-100">Features</a>
          <Link to="/bots" className="hover:text-zinc-100">Bots</Link>
          <a href={BOT_REPO_URL} target="_blank" rel="noreferrer" className="hover:text-zinc-100">Docs</a>
          <Link to="/leaderboard" className="hover:text-zinc-100">Leaderboard</Link>
        </nav>
        <span className="font-mono text-xs text-muted">© 2026 PaperEx · paper trading only</span>
      </div>
    </footer>
  )
}

export function SectionHeading({ eyebrow, title, center }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  )
}
