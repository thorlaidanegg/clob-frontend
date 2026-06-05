import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  Boxes,
  Repeat,
  Sprout,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BOT_REPO_URL, Footer, GithubIcon, Nav, SectionHeading } from '@/features/landing/chrome'

// ── static content ──────────────────────────────────────────────────────────

interface BotSpec {
  id: string
  name: string
  tagline: string
  icon: LucideIcon
  accent: string // tailwind text color for the badge/icon
  body: string
  bullets: string[]
  flags: { flag: string; desc: string }[]
  run: string
}

const bots: BotSpec[] = [
  {
    id: 'marketmaker',
    name: 'Market Maker',
    tagline: 'Two-sided liquidity',
    icon: Repeat,
    accent: 'text-accent',
    body: 'Continuously quotes a bid and an ask around the mid, layering several levels on each side and re-centering as the book drifts. Warehouses inventory — it only offers what it actually holds, so the long-only constraint is respected.',
    bullets: [
      'Posts N price levels per side around a drifting mid',
      'Cancels and re-quotes on every depth update',
      'Tracks its own position and never oversells',
    ],
    flags: [
      { flag: '-market', desc: 'market to quote (e.g. BTC-USD)' },
      { flag: '-size', desc: 'order size per level' },
      { flag: '-levels', desc: 'price levels per side' },
    ],
    run: 'go run ./examples/marketmaker -market BTC-USD -size 0.01 -levels 3',
  },
  {
    id: 'taker',
    name: 'Taker',
    tagline: 'Crosses the spread',
    icon: Zap,
    accent: 'text-amber-300',
    body: 'An aggressive flow generator: it crosses the spread with IOC orders, buying up to a max position and selling back the inventory it holds. Perfect for printing a live tape and exercising the matching engine end-to-end.',
    bullets: [
      'Fires immediate-or-cancel orders that take liquidity',
      'Buys toward a max position, then unwinds',
      'Generates a realistic, two-sided trade tape',
    ],
    flags: [
      { flag: '-market', desc: 'market to trade' },
      { flag: '-size', desc: 'size per cross' },
      { flag: '-maxpos', desc: 'inventory cap before unwinding' },
    ],
    run: 'go run ./examples/taker -market BTC-USD -size 0.01',
  },
  {
    id: 'seeder',
    name: 'Seeder',
    tagline: 'Bootstraps empty markets',
    icon: Sprout,
    accent: 'text-emerald-300',
    body: 'An admin-powered one-shot that primes brand-new, empty markets so they are not dead on arrival. It grants two accounts starting credits and base inventory, crosses a few trades on both sides to print a last price, and leaves a resting two-sided book.',
    bullets: [
      'Scans for markets that are open but empty',
      'Grants credits + inventory (bootstraps the sell side)',
      'Crosses trades both ways, then rests a symmetric book',
    ],
    flags: [
      { flag: '-market', desc: 'seed one market, or all empty ones' },
      { flag: '-price', desc: 'seed mid price' },
      { flag: '-trades', desc: 'seed trades per side' },
    ],
    run: 'go run ./examples/seeder -market SOL-USD -price 150 -trades 4',
  },
]

const lifecycle = [
  { hook: 'OnStart', desc: 'seed local state, place initial quotes' },
  { hook: 'OnDepth', desc: 'react to every order-book change' },
  { hook: 'OnTrade', desc: 'react to prints on the tape' },
  { hook: 'OnTick', desc: 'run logic on a fixed interval' },
  { hook: 'OnStop', desc: 'cancel resting orders, clean up' },
]

const strategyCode = `type MyStrategy struct{ strategy.Base }

func (s *MyStrategy) OnDepth(ctx context.Context, b *strategy.Bot, _ clobbot.DepthUpdate) {
    bid, ask := b.Book.BestBid(), b.Book.BestAsk()
    mid := (bid + ask) / 2

    b.CancelAll(ctx)
    b.Buy(ctx, mid*0.999, 0.01)   // tick/lot-rounded for you
    b.Sell(ctx, mid*1.001, 0.01)
}

func main() {
    c := clobbot.New(os.Getenv("CLOB_BASE_URL"), os.Getenv("CLOB_API_KEY"))
    strategy.Run(context.Background(), c, &MyStrategy{}, strategy.Config{
        Market: "BTC-USD", DepthLevels: 10,
    })
}`

const installCode = `go get github.com/thorlaidanegg/clob-bot

export CLOB_BASE_URL=http://localhost:8080
export CLOB_API_KEY=clob_live_...   # from the Developer page`

// ── page ────────────────────────────────────────────────────────────────────

export function BotsPage() {
  return (
    <div className="min-h-screen w-full bg-bg text-zinc-100">
      <Nav />
      <Hero />
      <BotGrid />
      <BuildYourOwn />
      <Quickstart />
      <FinalCta />
      <Footer />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-edge">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute left-1/2 top-[-20%] size-[720px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel/80 px-3 py-1 text-xs text-zinc-300">
            <Bot className="size-3.5 text-accent" /> Go SDK · clob-bot
          </span>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Trading bots that run on the <span className="text-gradient">real engine.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            A batteries-included Go SDK — REST client, streaming WebSocket feed, and a tiny strategy
            framework — plus three ready-to-run example bots. Point them at any market and watch them
            quote, take, and seed against the exact same order book the UI trades on.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a href={BOT_REPO_URL} target="_blank" rel="noreferrer">
              <Button size="lg" className="gap-2">
                <BookOpen className="size-4" /> Read the docs
              </Button>
            </a>
            <Link to="/login">
              <Button variant="outline" size="lg" className="gap-2">
                Get an API key <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted">
            {['REST + WebSocket', 'Auto-reconnect', 'Tick & lot rounding built in'].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                {t}
              </span>
            ))}
          </div>
        </div>

        <BotConsole />
      </div>
    </section>
  )
}

/** Hero centerpiece: a market-maker bot running live — book + event stream. */
function BotConsole() {
  const asks = [
    { px: '64,210.0', sz: '0.18' },
    { px: '64,198.5', sz: '0.06', you: true },
    { px: '64,190.0', sz: '0.04', you: true },
  ]
  const bids = [
    { px: '64,176.0', sz: '0.04', you: true },
    { px: '64,168.5', sz: '0.06', you: true },
    { px: '64,155.0', sz: '0.22' },
  ]
  const logs = [
    { t: '12:04:31', tag: 'QUOTE', cls: 'text-accent', msg: 'bid 64,176 · ask 64,198' },
    { t: '12:04:32', tag: 'FILL', cls: 'text-up', msg: 'sold 0.02 @ 64,198' },
    { t: '12:04:32', tag: 'SYNC', cls: 'text-sky-300', msg: 'position +0.04' },
    { t: '12:04:33', tag: 'CANCEL', cls: 'text-muted', msg: 'reposted 3 levels' },
    { t: '12:04:34', tag: 'QUOTE', cls: 'text-accent', msg: 'bid 64,168 · ask 64,190' },
  ]
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
            <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" /> marketmaker · live
          </span>
          <span className="w-12" />
        </div>

        {/* status strip */}
        <div className="grid grid-cols-3 divide-x divide-edge border-b border-edge">
          <ConsoleStat label="Market" value="BTC-USD" />
          <ConsoleStat label="Position" value="+0.04" />
          <ConsoleStat label="Session PnL" value="+182.40" up />
        </div>

        {/* body: live book + event stream */}
        <div className="grid grid-cols-[1fr_1.05fr]">
          <div className="border-r border-edge p-3 font-mono text-[11px]">
            <div className="mb-1 flex justify-between px-1 text-[9px] uppercase tracking-wide text-muted">
              <span>Price</span>
              <span>Size</span>
            </div>
            {asks.map((r) => (
              <ConsoleBookRow key={r.px} {...r} up={false} />
            ))}
            <div className="my-1 flex items-center justify-between px-1">
              <span className="font-bold text-zinc-100">64,182.0</span>
              <span className="text-[9px] text-muted">spread 0.80</span>
            </div>
            {bids.map((r) => (
              <ConsoleBookRow key={r.px} {...r} up />
            ))}
          </div>

          <div className="space-y-1.5 p-3 font-mono text-[11px]">
            <div className="mb-1.5 px-1 text-[9px] uppercase tracking-wide text-muted">Event stream</div>
            {logs.map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-muted/70">{l.t}</span>
                <span className={`w-12 shrink-0 font-semibold ${l.cls}`}>{l.tag}</span>
                <span className="truncate text-zinc-300">{l.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating lifecycle hint */}
      <div className="absolute -bottom-3 -right-3 hidden items-center gap-1.5 rounded-lg border border-edge bg-panel-2 px-3 py-1.5 font-mono text-[11px] shadow-xl sm:flex">
        <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
        <span className="text-muted">OnDepth →</span>
        <span className="text-zinc-200">re-quoting</span>
      </div>
    </div>
  )
}

function ConsoleStat({ label, value, up }: { label: string; value: string; up?: boolean }) {
  return (
    <div className="px-3 py-2.5">
      <div className="text-[9px] uppercase tracking-wide text-muted">{label}</div>
      <div className={`font-mono text-sm font-semibold tabular-nums ${up ? 'text-up' : 'text-zinc-100'}`}>{value}</div>
    </div>
  )
}

function ConsoleBookRow({ px, sz, up, you }: { px: string; sz: string; up: boolean; you?: boolean }) {
  return (
    <div className="relative flex h-5 items-center justify-between px-1">
      <div className={`absolute inset-y-0 right-0 ${up ? 'bg-up/12' : 'bg-down/12'}`} style={{ width: `${Number(sz) * 200}%` }} />
      <span className={`relative z-10 tabular-nums ${up ? 'text-up' : 'text-down'}`}>{px}</span>
      <span className="relative z-10 flex items-center gap-1.5">
        {you && <span className="rounded-sm bg-accent/15 px-1 text-[8px] font-bold uppercase tracking-wide text-accent">you</span>}
        <span className="tabular-nums text-muted">{sz}</span>
      </span>
    </div>
  )
}

function BotGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading eyebrow="The example bots" title="Three bots, ready to run" />
      <p className="mt-3 max-w-2xl text-muted">
        Each ships as a standalone command in the SDK. Build them with the included Dockerfile, or
        run them straight from source.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {bots.map((b) => (
          <BotCard key={b.id} bot={b} />
        ))}
      </div>
    </section>
  )
}

function BotCard({ bot }: { bot: BotSpec }) {
  const Icon = bot.icon
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-edge bg-panel/40 transition-colors hover:border-accent/30 hover:bg-panel">
      <div className="flex items-center gap-3 border-b border-edge p-5">
        <div className={`flex size-11 items-center justify-center rounded-lg border border-edge bg-panel-2 ${bot.accent} transition-colors group-hover:border-accent/40`}>
          <Icon className="size-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold leading-tight">{bot.name}</h3>
          <div className="font-mono text-xs text-muted">{bot.tagline}</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-muted">{bot.body}</p>

        <ul className="mt-4 space-y-1.5">
          {bot.bullets.map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm text-zinc-300">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 space-y-1.5 font-mono text-xs">
          {bot.flags.map((f) => (
            <div key={f.flag} className="flex gap-2">
              <span className="shrink-0 text-accent">{f.flag}</span>
              <span className="text-muted">{f.desc}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <CodeBar text={bot.run} />
        </div>
      </div>
    </div>
  )
}

/** A single-line terminal command with a leading prompt. */
function CodeBar({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto rounded-lg border border-edge bg-bg px-3 py-2.5 font-mono text-[12px]">
      <span className="shrink-0 select-none text-accent">$</span>
      <span className="whitespace-nowrap text-zinc-300">{text}</span>
    </div>
  )
}

function BuildYourOwn() {
  return (
    <section className="border-y border-edge bg-panel/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-1 text-xs text-zinc-300">
            <Workflow className="size-3.5 text-accent" /> strategy framework
          </span>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            Write your own in
            <br />
            a few lines.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted">
            Implement the <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-sm text-accent">Strategy</code> interface
            and the framework handles the rest: dialing the WebSocket, authenticating, maintaining a
            local order book, reconnecting with backoff, and rounding your prices to the tick and lot
            size. You just decide what to do on each event.
          </p>

          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {lifecycle.map((l) => (
              <li key={l.hook} className="rounded-lg border border-edge bg-bg px-3 py-2.5">
                <div className="font-mono text-sm font-semibold text-accent">{l.hook}</div>
                <div className="mt-0.5 text-xs text-muted">{l.desc}</div>
              </li>
            ))}
          </ul>

          <a href={`${BOT_REPO_URL}#strategy-framework`} target="_blank" rel="noreferrer">
            <Button variant="outline" className="gap-2">
              Strategy docs <ArrowUpRight className="size-4" />
            </Button>
          </a>
        </div>

        <CodeBlock title="strategy.go" code={strategyCode} />
      </div>
    </section>
  )
}

function Quickstart() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading eyebrow="Quickstart" title="Up and running in two commands" center />
      <div className="mx-auto mt-12 max-w-2xl">
        <CodeBlock title="install.sh" code={installCode} />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Terminal, t: 'Install the SDK', d: 'One go get and you have the client, stream, and strategy packages.' },
            { icon: Boxes, t: 'Dockerized', d: 'A multi-stage Dockerfile and compose file run the whole bot fleet.' },
            { icon: GithubIcon, t: 'Fully documented', d: 'Every type, flag, and example is covered in the repo README.' },
          ].map((s) => (
            <div key={s.t} className="rounded-xl border border-edge bg-panel/40 p-5">
              <s.icon className="size-5 text-accent" />
              <h3 className="mt-3 text-sm font-bold">{s.t}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** A faux editor/terminal window with monospace content. */
function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-panel shadow-2xl">
      <div className="flex items-center gap-2 border-b border-edge bg-panel-2/60 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-down/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-up/80" />
        <span className="ml-2 font-mono text-xs text-muted">{title}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-edge">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Ship your first bot <span className="text-gradient">today.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          Grab an API key, clone the SDK, and put an automated strategy on the book in minutes.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={BOT_REPO_URL} target="_blank" rel="noreferrer">
            <Button size="lg" className="gap-2">
              <GithubIcon /> View on GitHub
            </Button>
          </a>
          <Link to="/login">
            <Button variant="outline" size="lg">Get an API key</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
