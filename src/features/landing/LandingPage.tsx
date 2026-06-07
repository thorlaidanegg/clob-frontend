import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Cpu,
  Gauge,
  Layers,
  Package,
  Radio,
  ShieldCheck,
  Terminal,
  Trophy,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer, LIBRARY_REPO_URL, Nav, SectionHeading, useAppEntry } from './chrome'

// ── static demo data ─────────────────────────────────────────────────────────

const ticker = [
  { s: 'BTC-USD', p: '64,182.50', c: '+2.34%', up: true },
  { s: 'ETH-USD', p: '3,287.40', c: '+1.87%', up: true },
  { s: 'SOL-USD', p: '198.42', c: '+5.61%', up: true },
  { s: 'BNB-USD', p: '612.65', c: '-1.12%', up: false },
  { s: 'XRP-USD', p: '0.6124', c: '-0.84%', up: false },
  { s: 'AVAX-USD', p: '36.18', c: '+4.05%', up: true },
  { s: 'LINK-USD', p: '14.92', c: '+2.78%', up: true },
  { s: 'DOGE-USD', p: '0.0821', c: '-2.41%', up: false },
]

const stats = [
  { v: 'price-time', l: 'priority matching engine' },
  { v: '< 1ms', l: 'in-memory match latency' },
  { v: 'REST + WS', l: 'full programmatic API' },
  { v: '$100k', l: 'in starting credits' },
]

const features = [
  { icon: Cpu, title: 'A real matching engine', body: 'Not a price feed with fake fills. Orders rest, queue, and match against a genuine price-time priority limit order book.' },
  { icon: Radio, title: 'Streaming, tick-by-tick', body: 'Order book and trade tape stream over WebSocket and update the instant the book changes. No polling, no lag.' },
  { icon: Terminal, title: 'Built for bots', body: 'Generate an API key and automate any strategy — market making, momentum, arbitrage — against the same engine the UI uses.' },
  { icon: Boxes, title: 'Every order type', body: 'Limit, market, stop, stop-limit, iceberg, with IOC / FOK / GTD, post-only and reduce-only flags. The real toolkit.' },
  { icon: Trophy, title: 'A live leaderboard', body: 'Realized PnL is ranked globally and updates in real time. Prove your edge against everyone else trading.' },
  { icon: ShieldCheck, title: 'Zero real risk', body: 'No deposit, no KYC, no real money. Blow up your account, learn, and reset — the only thing on the line is bragging rights.' },
]

const steps = [
  { n: '01', title: 'Sign up in seconds', body: 'No deposit, no KYC. Get a fresh balance of virtual credits the moment you create an account.' },
  { n: '02', title: 'Trade live markets', body: 'Place orders and watch them rest and fill against a real, streaming order book in real time.' },
  { n: '03', title: 'Track PnL & climb', body: 'Watch realized and unrealized PnL update tick-by-tick and rise through the global rankings.' },
]

const topTraders = [
  { rank: 1, name: '@quantwhale', pnl: '+248,910', medal: '🥇', border: 'border-l-[#ffd700]' },
  { rank: 2, name: '@deltaedge', pnl: '+187,432', medal: '🥈', border: 'border-l-[#c0c0c0]' },
  { rank: 3, name: '@orderflow_kid', pnl: '+152,008', medal: '🥉', border: 'border-l-[#cd7f32]' },
  { rank: 4, name: '@scalp_machine', pnl: '+98,540', medal: '', border: 'border-l-transparent' },
  { rank: 5, name: '@hodl_bot_v3', pnl: '+76,221', medal: '', border: 'border-l-transparent' },
]

// ── page ──────────────────────────────────────────────────────────────────────

export function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-bg text-zinc-100">
      <Nav />
      <Hero />
      <TickerTape />
      <Stats />
      <Features />
      <HowItWorks />
      <ApiSection />
      <LibrarySection />
      <LeaderboardPreview />
      <FinalCta />
      <Footer />
    </div>
  )
}

function Hero() {
  const entry = useAppEntry()
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] size-[820px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel/80 px-3 py-1 text-xs text-zinc-300">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
            Live matching engine · paper trading
          </span>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Trade like it&apos;s real.
            <br />
            <span className="text-gradient">Risk absolutely nothing.</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted">
            A full crypto-style exchange on a genuine price-time priority engine — live order books,
            real fills, real PnL. Just with virtual credits instead of your savings.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link to={entry}>
              <Button size="lg" className="gap-2">
                {entry === '/markets' ? 'Open the app' : 'Start trading free'} <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="outline" size="lg">View live leaderboard</Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted">
            {['No deposit', 'No KYC', 'Real engine, not a simulation'].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                {t}
              </span>
            ))}
          </div>
        </div>

        <Terminal3D />
      </div>
    </section>
  )
}

/** The hero centerpiece: a realistic mini trading terminal. */
function Terminal3D() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-3xl bg-accent/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-xl border border-edge bg-panel shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)]">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-edge bg-panel-2/60 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-down/80" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-up/80" />
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" /> BTC-USD · live
          </span>
          <span className="w-12" />
        </div>

        {/* price header */}
        <div className="flex items-baseline gap-3 border-b border-edge px-4 py-3">
          <span className="font-mono text-2xl font-bold tabular-nums">64,182.50</span>
          <span className="rounded-sm bg-up/15 px-1.5 py-0.5 font-mono text-xs font-semibold text-up">+2.34%</span>
          <span className="ml-auto font-mono text-[11px] text-muted">24h vol 1,284.5M</span>
        </div>

        <div className="grid grid-cols-[1.6fr_1fr]">
          {/* chart */}
          <div className="relative border-r border-edge p-2">
            <div className="h-44">
              <CandleChart />
            </div>
          </div>

          {/* order book */}
          <div className="p-2 font-mono text-[11px]">
            <div className="mb-1 flex justify-between px-1 text-[9px] uppercase tracking-wide text-muted">
              <span>Price</span>
              <span>Size</span>
            </div>
            {[
              ['64,210', 86], ['64,205', 64], ['64,198', 48], ['64,190', 30],
            ].map(([p, w]) => (
              <BookRow key={p as string} price={p as string} width={w as number} up={false} />
            ))}
            <div className="my-1 flex items-center justify-between px-1">
              <span className="font-bold text-zinc-100">64,182</span>
              <span className="text-[9px] text-muted">spread 0.80</span>
            </div>
            {[
              ['64,176', 40], ['64,170', 56], ['64,162', 72], ['64,155', 90],
            ].map(([p, w]) => (
              <BookRow key={p as string} price={p as string} width={w as number} up />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BookRow({ price, width, up }: { price: string; width: number; up: boolean }) {
  return (
    <div className="relative flex h-5 items-center justify-between px-1">
      <div
        className={`absolute inset-y-0 right-0 ${up ? 'bg-up/12' : 'bg-down/12'}`}
        style={{ width: `${width}%` }}
      />
      <span className={`relative z-10 tabular-nums ${up ? 'text-up' : 'text-down'}`}>{price}</span>
      <span className="relative z-10 tabular-nums text-muted">{(width / 40).toFixed(2)}</span>
    </div>
  )
}

function CandleChart() {
  // [open, high, low, close]
  const candles: [number, number, number, number][] = [
    [42, 46, 40, 45], [45, 47, 43, 44], [44, 48, 43, 47], [47, 49, 45, 46],
    [46, 51, 45, 50], [50, 52, 48, 49], [49, 54, 48, 53], [53, 55, 51, 52],
    [52, 57, 51, 56], [56, 58, 53, 55], [55, 61, 54, 60], [60, 63, 58, 59],
    [59, 64, 58, 63], [63, 65, 61, 62], [62, 67, 61, 66], [66, 69, 64, 68],
  ]
  const W = 320
  const H = 160
  const pad = 10
  const vals = candles.flatMap((c) => [c[1], c[2]])
  const max = Math.max(...vals)
  const min = Math.min(...vals)
  const y = (v: number) => pad + (1 - (v - min) / (max - min)) * (H - 2 * pad)
  const cw = W / candles.length
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="size-full">
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={0} x2={W} y1={H * g} y2={H * g} stroke="var(--color-edge)" strokeWidth={1} />
      ))}
      {candles.map((c, i) => {
        const [o, h, l, cl] = c
        const up = cl >= o
        const x = i * cw + cw / 2
        const col = up ? 'var(--color-up)' : 'var(--color-down)'
        const top = y(Math.max(o, cl))
        const bot = y(Math.min(o, cl))
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={y(h)} y2={y(l)} stroke={col} strokeWidth={1.2} />
            <rect x={i * cw + cw * 0.22} width={cw * 0.56} y={top} height={Math.max(bot - top, 1.5)} fill={col} rx={0.5} />
          </g>
        )
      })}
    </svg>
  )
}

function TickerTape() {
  const row = [...ticker, ...ticker]
  return (
    <div className="border-y border-edge bg-panel/40 py-3">
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee gap-8">
          {row.map((t, i) => (
            <span key={i} className="flex shrink-0 items-center gap-2 font-mono text-sm">
              <span className="font-semibold text-zinc-200">{t.s}</span>
              <span className="tabular-nums text-zinc-400">{t.p}</span>
              <span className={`tabular-nums ${t.up ? 'text-up' : 'text-down'}`}>{t.c}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stats() {
  return (
    <section className="border-b border-edge">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-edge px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="px-2 py-8 text-center first:pl-0">
            <div className="font-mono text-2xl font-bold tracking-tight text-zinc-50">{s.v}</div>
            <div className="mt-1 text-xs text-muted">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading eyebrow="Why it feels real" title="An exchange, not a toy" />
      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="group bg-bg p-7 transition-colors hover:bg-panel">
            <div className="flex size-11 items-center justify-center rounded-lg border border-edge bg-panel-2 text-accent transition-colors group-hover:border-accent/40">
              <f.icon className="size-5" />
            </div>
            <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how" className="border-y border-edge bg-panel/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading eyebrow="How it works" title="From zero to filled in a minute" />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative overflow-hidden rounded-xl border border-edge bg-bg p-8">
              <div className="pointer-events-none absolute -right-2 -top-4 font-mono text-8xl font-bold text-edge/70">
                {s.n}
              </div>
              <div className="relative">
                <div className="font-mono text-sm font-bold text-accent">{s.n}</div>
                <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ApiSection() {
  const entry = useAppEntry()
  return (
    <section id="api" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-edge bg-panel shadow-2xl">
          <div className="flex items-center gap-2 border-b border-edge bg-panel-2/60 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-down/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-up/80" />
            <span className="ml-2 font-mono text-xs text-muted">place_order.sh</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
            <code>
              <span className="text-muted"># place a limit order via the REST API</span>
              {'\n'}
              <span className="text-accent">curl</span> -X POST <span className="text-zinc-300">https://api.paperex.io/v1/orders</span>{' \\'}
              {'\n  '}-H <span className="text-emerald-300">&quot;Authorization: Bearer $CLOB_API_KEY&quot;</span>{' \\'}
              {'\n  '}-d <span className="text-emerald-300">&apos;{'{'}</span>
              {'\n    '}<span className="text-sky-300">&quot;marketID&quot;</span>: <span className="text-emerald-300">&quot;BTC-USD&quot;</span>,
              {'\n    '}<span className="text-sky-300">&quot;side&quot;</span>: <span className="text-emerald-300">&quot;bid&quot;</span>,
              {'\n    '}<span className="text-sky-300">&quot;orderType&quot;</span>: <span className="text-emerald-300">&quot;limit&quot;</span>,
              {'\n    '}<span className="text-sky-300">&quot;price&quot;</span>: <span className="text-amber-300">&quot;64182.50&quot;</span>,
              {'\n    '}<span className="text-sky-300">&quot;qty&quot;</span>: <span className="text-amber-300">&quot;0.25&quot;</span>
              {'\n  '}<span className="text-emerald-300">{'}'}&apos;</span>
            </code>
          </pre>
        </div>

        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-1 text-xs text-zinc-300">
            <Gauge className="size-3.5 text-accent" /> REST + WebSocket
          </span>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            Build bots. Test strategies.
            <br />
            Ship with confidence.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted">
            The full exchange is programmable. Generate an API key, stream the book over WebSocket,
            and fire orders over REST — the exact same engine the UI trades on. Connect an AI agent
            over MCP while you&apos;re at it.
          </p>
          <Link to={entry}>
            <Button variant="outline" className="gap-2">
              Get your API key <ArrowUpRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

const libFeatures = [
  { icon: Package, title: 'Zero infrastructure', body: 'No database, no queue, no network. It embeds directly in any Go binary — give it config, send commands, read events.' },
  { icon: Boxes, title: 'Every order type', body: 'Limit, market, stop, stop-limit and iceberg, with IOC / FOK / GTD, post-only and reduce-only — the full toolkit, built in.' },
  { icon: Zap, title: 'Deterministic & fast', body: 'A single-goroutine, in-memory price-time priority book. Same inputs, same outputs, sub-millisecond matching.' },
  { icon: Layers, title: 'Event-sourced by design', body: 'A clean command-in / event-out API. Project the event stream into Postgres, Kafka, a websocket — whatever you need.' },
]

const libCode = `import "github.com/thorlaidanegg/clob/engine"

// A market is just config — no DB, no network.
eng, _ := engine.New(cfg)
eng.Start()

// Commands in: limit, market, stop, iceberg…
eng.Submit(cmd)

// Events out: every fill, rest, cancel & book delta.
for ev := range eng.Events() {
    project(ev) // → DB, websocket, ledger…
}`

function LibrarySection() {
  return (
    <section id="library" className="relative overflow-hidden border-y border-edge bg-panel/30">
      <div className="pointer-events-none absolute right-1/4 top-0 size-120 rounded-full bg-accent/6 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-1 text-xs text-zinc-300">
              <Cpu className="size-3.5 text-accent" /> Open source · the engine underneath
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Don&apos;t just trade on it.
              <br />
              <span className="text-gradient">Build on it.</span>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted">
              This whole exchange runs on <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-sm text-accent">clob</code> —
              a standalone, dependency-free Go matching engine. PaperEx is just <em>one</em> product built on it.
              The same library can power a prediction market, a backtester, an exchange simulator, or an
              internal trading desk. Drop it into a Go binary and you have a real order book in a few lines.
            </p>
            <a href={LIBRARY_REPO_URL} target="_blank" rel="noreferrer">
              <Button className="gap-2">
                Explore the library <ArrowUpRight className="size-4" />
              </Button>
            </a>
          </div>

          <div className="overflow-hidden rounded-xl border border-edge bg-panel shadow-2xl">
            <div className="flex items-center gap-2 border-b border-edge bg-panel-2/60 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-down/80" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-up/80" />
              <span className="ml-2 font-mono text-xs text-muted">main.go</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-zinc-300">
              <code>{libCode}</code>
            </pre>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4">
          {libFeatures.map((f) => (
            <div key={f.title} className="bg-bg p-6">
              <f.icon className="size-5 text-accent" />
              <h3 className="mt-4 text-base font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LeaderboardPreview() {
  return (
    <section className="border-y border-edge bg-panel/30">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <SectionHeading eyebrow="The arena" title="Top traders, right now" center />
        <p className="mt-3 text-center text-muted">Ranked by realized PnL, updated every second.</p>

        <div className="mt-10 overflow-hidden rounded-xl border border-edge bg-bg">
          <div className="grid grid-cols-[3rem_1fr_auto] gap-4 border-b border-edge px-6 py-3 text-xs font-medium uppercase tracking-wide text-muted">
            <span>Rank</span>
            <span>Trader</span>
            <span className="text-right">Realized PnL</span>
          </div>
          {topTraders.map((t) => (
            <div key={t.rank} className={`grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-l-2 px-6 py-3.5 ${t.border}`}>
              <span className="flex items-center gap-1.5 font-mono text-lg font-bold tabular-nums">
                {t.medal || t.rank}
              </span>
              <span className="font-mono text-sm text-zinc-200">{t.name}</span>
              <span className="text-right font-mono text-lg font-bold tabular-nums text-up">{t.pnl}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link to="/leaderboard" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            See the full leaderboard <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  const entry = useAppEntry()
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Your first fill is <span className="text-gradient">one click away.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          Sign up, claim your virtual credits, and put your first order on the book in under a minute.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to={entry}>
            <Button size="lg" className="gap-2">
              {entry === '/markets' ? 'Open the app' : 'Start trading free'} <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link to="/leaderboard">
            <Button variant="outline" size="lg">View leaderboard</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

