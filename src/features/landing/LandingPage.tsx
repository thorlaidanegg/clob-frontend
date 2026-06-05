import { Link } from '@tanstack/react-router'
import {
  Activity,
  ArrowRight,
  BookOpen,
  CandlestickChart,
  Cpu,
  Terminal,
  Trophy,
  Workflow,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Cpu,
    title: 'Real matching engine',
    body: 'Orders rest, match, and fill against a true price-time priority book.',
  },
  {
    icon: Activity,
    title: 'Live, in real time',
    body: 'Streaming order books and trade tape update tick-by-tick, instantly.',
  },
  {
    icon: Terminal,
    title: 'Trade by API or build bots',
    body: 'A full REST and WebSocket API lets you automate any strategy you dream up.',
  },
  {
    icon: Trophy,
    title: 'Climb the leaderboard',
    body: 'Compete on realized PnL and prove your edge against thousands of traders.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Sign up & get virtual credits',
    body: 'Create an account in seconds — no deposit, no KYC. Start with a fresh balance of virtual credits.',
  },
  {
    n: '02',
    title: 'Trade real markets',
    body: 'Place orders and watch them fill live against a real matching engine and live order books.',
  },
  {
    n: '03',
    title: 'Track PnL & climb',
    body: 'Monitor your realized PnL in real time and rise through the global leaderboard rankings.',
  },
]

const topTraders = [
  { rank: 1, name: '@quantwhale', pnl: '+248,910', accentBorder: 'border-l-[#ffd700]' },
  { rank: 2, name: '@deltaedge', pnl: '+187,432', accentBorder: 'border-l-[#c0c0c0]' },
  { rank: 3, name: '@orderflow_kid', pnl: '+152,008', accentBorder: 'border-l-[#cd7f32]' },
  { rank: 4, name: '@scalp_machine', pnl: '+98,540', accentBorder: 'border-l-transparent' },
  { rank: 5, name: '@hodl_bot_v3', pnl: '+76,221', accentBorder: 'border-l-transparent' },
]

const bars: Array<['up' | 'down', number, number, number]> = [
  ['up', 3, 8, 2], ['down', 4, 6, 3], ['up', 2, 12, 3], ['up', 5, 10, 2],
  ['down', 6, 7, 4], ['down', 3, 5, 2], ['up', 4, 14, 3], ['up', 2, 9, 5],
  ['down', 5, 6, 2], ['up', 3, 16, 2], ['up', 4, 11, 3],
]

export function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-bg text-zinc-50">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-1/4 size-[640px] rounded-full bg-accent/10 blur-[160px]" />

        <header className="relative z-20 flex h-14 w-full items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-sm bg-accent">
              <CandlestickChart className="size-4 text-black" />
            </div>
            <span className="text-base font-bold tracking-tight">PaperEx</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted lg:flex">
            <a href="#features" className="flex items-center gap-2 transition-colors hover:text-zinc-100">
              <Zap className="size-4" /> Features
            </a>
            <a href="#how" className="flex items-center gap-2 transition-colors hover:text-zinc-100">
              <Workflow className="size-4" /> How it works
            </a>
            <Link to="/leaderboard" className="flex items-center gap-2 transition-colors hover:text-zinc-100">
              <Trophy className="size-4" /> Leaderboard
            </Link>
            <a href="#api" className="flex items-center gap-2 transition-colors hover:text-zinc-100">
              <BookOpen className="size-4" /> Docs
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/login">
              <Button size="sm">Start trading free</Button>
            </Link>
          </div>
        </header>

        <section className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center gap-12 px-6 pt-16 md:px-12 lg:flex-row lg:pt-20">
          <div className="flex w-full flex-col gap-8 lg:w-1/2">
            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-[68px] md:leading-[71px]">
              Trade like it&apos;s real.
              <br />
              Risk nothing.
            </h1>
            <p className="max-w-[480px] text-lg leading-7 text-muted">
              A full crypto-style exchange powered by a real matching engine — live order books,
              real fills, real PnL. Just with virtual credits instead of real money.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/login">
                <Button size="lg">Start trading free</Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="outline" size="lg">
                  View live leaderboard
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-xs text-muted">
              {['No deposit', 'No KYC', 'Real engine, not a simulation'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Mock terminal */}
          <div className="relative w-full lg:w-1/2">
            <div className="absolute inset-8 rounded-2xl bg-accent/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-xl border border-edge bg-panel shadow-2xl">
              <div className="flex items-center justify-between border-b border-edge px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent">
                    <span className="size-1.5 rounded-full bg-accent" /> Live
                  </span>
                  <span className="text-sm font-semibold">BTC/USDT</span>
                </div>
                <span className="font-mono text-sm font-semibold text-accent">64,182.50</span>
              </div>
              <div className="flex">
                <div className="flex-1 border-r border-edge p-4">
                  <div className="flex h-48 items-end gap-1">
                    {bars.map((c, i) => {
                      const color = c[0] === 'up' ? 'bg-up' : 'bg-down'
                      return (
                        <div key={i} className="flex w-2 flex-col items-center">
                          <div className={`${color} w-px`} style={{ height: `${c[1] * 4}px` }} />
                          <div className={`${color} w-full`} style={{ height: `${c[2] * 4}px` }} />
                          <div className={`${color} w-px`} style={{ height: `${c[3] * 4}px` }} />
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="w-32 border-r border-edge p-3 font-mono text-[11px]">
                  <div className="mb-1 text-[10px] text-muted">Price · Size</div>
                  {([
                    ['64,210', '0.84', false], ['64,205', '1.21', false],
                    ['64,198', '2.05', true], ['64,190', '0.55', false],
                  ] as const).map(([p, s, hl], i) => (
                    <div key={i} className={`flex justify-between text-down ${hl ? 'rounded-xs bg-down/15' : ''}`}>
                      <span>{p}</span>
                      <span className="text-muted">{s}</span>
                    </div>
                  ))}
                  <div className="my-1 text-center text-sm font-bold">64,182</div>
                  {([
                    ['64,176', '1.92', true], ['64,170', '0.73', false],
                    ['64,162', '1.40', false], ['64,155', '2.18', false],
                  ] as const).map(([p, s, hl], i) => (
                    <div key={i} className={`flex justify-between text-up ${hl ? 'rounded-xs bg-up/15' : ''}`}>
                      <span>{p}</span>
                      <span className="text-muted">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="w-24 p-3 font-mono text-[10px]">
                  <div className="mb-1 text-[10px] text-muted">Trades</div>
                  {([
                    ['64,182', 'up', false], ['64,179', 'down', true], ['64,184', 'up', false],
                    ['64,186', 'up', true], ['64,177', 'down', false], ['64,181', 'up', false],
                    ['64,175', 'down', false],
                  ] as const).map(([p, side, hl], i) => {
                    const color = side === 'up' ? 'text-up' : 'text-down'
                    const bg = hl ? (side === 'up' ? 'bg-up/15' : 'bg-down/15') : ''
                    return (
                      <div key={i} className={`flex justify-between rounded-xs ${color} ${bg}`}>
                        <span>{p}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="w-full bg-panel px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="mb-12 text-4xl font-bold tracking-tight">Why it feels real</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="bg-bg">
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-sm bg-accent/15">
                    <f.icon className="size-5 text-accent" />
                  </div>
                  <CardTitle>{f.title}</CardTitle>
                </CardHeader>
                <CardContent>{f.body}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section id="how" className="w-full bg-bg px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="mb-12 text-4xl font-bold tracking-tight">How it works</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-xl border border-edge bg-panel p-8">
                <div className="mb-4 font-mono text-5xl font-bold text-accent">{s.n}</div>
                <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
                <p className="text-sm leading-5 text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leaderboard preview ──────────────────────────────────────────── */}
      <section className="w-full bg-panel px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="mb-2 text-4xl font-bold tracking-tight">Top traders, right now</h2>
          <p className="mb-10 text-muted">Live realized PnL, updated every second.</p>
          <div className="overflow-hidden rounded-xl border border-edge bg-bg">
            <div className="grid grid-cols-3 border-b border-edge px-6 py-3 text-left text-xs font-medium text-muted">
              <span>Rank</span>
              <span>Trader</span>
              <span className="text-right">Realized PnL</span>
            </div>
            {topTraders.map((t) => (
              <div
                key={t.rank}
                className={`grid grid-cols-3 items-center border-l-2 px-6 py-4 text-left ${t.accentBorder}`}
              >
                <span className="font-mono text-lg font-bold">{t.rank}</span>
                <span className="font-mono text-sm">{t.name}</span>
                <span className="text-right font-mono text-xl font-bold text-up">{t.pnl}</span>
              </div>
            ))}
          </div>
          <Link
            to="/leaderboard"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent"
          >
            See full leaderboard <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* ── API / bots ───────────────────────────────────────────────────── */}
      <section id="api" className="w-full bg-[#0d0d10] px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-edge bg-bg">
            <div className="flex items-center gap-2 border-b border-edge px-4 py-3">
              <span className="size-3 rounded-full bg-down" />
              <span className="size-3 rounded-full bg-[#ffd700]" />
              <span className="size-3 rounded-full bg-up" />
              <span className="ml-2 font-mono text-xs text-muted">place_order.sh</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
              <code>
                <span className="text-accent">curl</span>{' '}
                <span className="text-zinc-50">-X POST https://api.paperex.io/v1/orders</span>
                {'\n  '}
                <span className="text-zinc-50">-H </span>
                <span className="text-muted">&apos;Authorization: Bearer $API_KEY&apos;</span>
                {'\n  '}
                <span className="text-zinc-50">-d </span>
                <span className="text-muted">&apos;{'{'}</span>
                {'\n    '}
                <span className="text-accent">&quot;symbol&quot;</span>
                <span className="text-zinc-50">: </span>
                <span className="text-muted">&quot;BTC-USDT&quot;,</span>
                {'\n    '}
                <span className="text-accent">&quot;side&quot;</span>
                <span className="text-zinc-50">: </span>
                <span className="text-muted">&quot;buy&quot;,</span>
                {'\n    '}
                <span className="text-accent">&quot;type&quot;</span>
                <span className="text-zinc-50">: </span>
                <span className="text-muted">&quot;limit&quot;,</span>
                {'\n    '}
                <span className="text-accent">&quot;price&quot;</span>
                <span className="text-zinc-50">: 64182.50,</span>
                {'\n    '}
                <span className="text-accent">&quot;size&quot;</span>
                <span className="text-zinc-50">: 0.25</span>
                {'\n  '}
                <span className="text-muted">{'}'}&apos;</span>
              </code>
            </pre>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold leading-tight tracking-tight">
              Build bots. Test strategies. Ship fast.
            </h2>
            <p className="max-w-md text-base leading-6 text-muted">
              A complete REST and WebSocket API mirrors the real exchange. Prototype trading bots,
              backtest live, and validate your edge — all against a genuine matching engine with
              zero risk.
            </p>
            <div>
              <Link to="/settings/keys">
                <Button variant="outline">
                  Read the API docs <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="w-full border-t border-edge bg-bg px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded-sm bg-accent">
              <CandlestickChart className="size-3 text-black" />
            </div>
            <span className="text-sm font-semibold text-muted">PaperEx</span>
          </div>
          <nav className="flex items-center gap-8 text-sm text-muted">
            <a href="#features" className="hover:text-zinc-100">Features</a>
            <a href="#how" className="hover:text-zinc-100">How it works</a>
            <Link to="/leaderboard" className="hover:text-zinc-100">Leaderboard</Link>
            <a href="#api" className="hover:text-zinc-100">Docs</a>
          </nav>
          <span className="text-xs text-muted">© 2026 PaperEx. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
