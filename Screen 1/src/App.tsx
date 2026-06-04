import { useEffect } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function App() {
  return (
    <div>
      <div className="font-sans bg-neutral-950 text-neutral-50 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="relative min-h-screen bg-[#0a0a0b] w-full overflow-hidden">
          <div className="pointer-events-none top-1/4 size-[640px] blur-[160px] rounded-full bg-[#00ff88]/10 absolute right-0" />
          <header className="relative z-20 flex px-12 justify-between items-center w-full h-12">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-sm bg-[#00ff88] flex justify-center items-center">
                <CandlestickChart className="size-4 text-black" />
              </div>
              <span className="font-bold text-neutral-50 text-base leading-6 tracking-tight">
                PaperEx
              </span>
            </div>
            <nav className="flex items-center gap-8">
              <button className="transition-colors text-[#a1a1a1] text-sm leading-5 flex items-center gap-2">
                <Zap className="size-4" />
                Features
              </button>
              <button className="transition-colors text-[#a1a1a1] text-sm leading-5 flex items-center gap-2">
                <Workflow className="size-4" />
                How it works
              </button>
              <button className="transition-colors text-[#a1a1a1] text-sm leading-5 flex items-center gap-2">
                <Trophy className="size-4" />
                Leaderboard
              </button>
              <button className="transition-colors text-[#a1a1a1] text-sm leading-5 flex items-center gap-2">
                <BookOpen className="size-4" />
                Docs
              </button>
            </nav>
            <div className="flex items-center gap-2">
              <Button className="border-[oklch(1_0_0/0.15)] bg-transparent rounded-sm text-neutral-50 text-sm leading-5 border-black/1 border-1 border-solid px-4 h-9">
                Log in
              </Button>
              <Button className="font-semibold rounded-sm bg-[#00ff88] text-black text-sm leading-5 px-4 h-9">
                Start trading free
              </Button>
            </div>
          </header>
          <section className="relative z-10 max-w-[1600px] flex mx-auto px-12 pt-20 items-center gap-12 w-full">
            <div className="w-1/2 flex flex-col gap-8">
              <h1 className="font-bold text-neutral-50 text-[68px] leading-[71px] tracking-tight">
                Trade like it's real.
                <br />
                Risk nothing.
              </h1>
              <p className="max-w-[480px] leading-relaxed text-[#a1a1a1] text-lg leading-7">
                A full crypto-style exchange powered by a real matching engine —
                live order books, real fills, real PnL. Just with virtual
                credits instead of real money.
              </p>
              <div className="flex items-center gap-4">
                <Button className="font-semibold rounded-sm bg-[#00ff88] text-black text-base leading-6 px-6 h-12">
                  Start trading free
                </Button>
                <Button className="border-[oklch(1_0_0/0.15)] bg-transparent rounded-sm text-neutral-50 text-base leading-6 border-black/1 border-1 border-solid px-6 h-12">
                  View live leaderboard
                </Button>
              </div>
              <div className="text-[#a1a1a1] text-xs leading-4 flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#00ff88]" />
                  No deposit
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#00ff88]" />
                  No KYC
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#00ff88]" />
                  Real engine, not a simulation
                </span>
              </div>
            </div>
            <div className="relative w-1/2">
              <div className="blur-3xl rounded-2xl bg-[#00ff88]/10 absolute inset-8" />
              <div className="relative border-[oklch(1_0_0/0.1)] shadow-2xl rounded-xl bg-[#111114] border-black/1 border-1 border-solid overflow-hidden">
                <div className="border-[oklch(1_0_0/0.1)] border-black/1 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-4 py-3 justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="font-medium rounded-full bg-[#00ff88]/15 text-[#00ff88] text-[11px] flex px-2 py-0.5 items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-[#00ff88]" />
                      Live
                    </span>
                    <span className="font-semibold text-neutral-50 text-sm leading-5">
                      BTC/USDT
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-[#00ff88] text-sm leading-5">
                    64,182.50
                  </span>
                </div>
                <div className="flex">
                  <div className="border-[oklch(1_0_0/0.1)] border-black/1 border-t-0 border-r-1 border-b-0 border-l-0 border-solid p-4 flex-1">
                    <div className="flex items-end gap-1 h-48">
                      <div className="flex flex-col items-center w-2">
                        <div className="bg-[#00ff88] w-px h-3" />
                        <div className="bg-[#00ff88] w-full h-8" />
                        <div className="bg-[#00ff88] w-px h-2" />
                      </div>
                      <div className="flex flex-col items-center w-2">
                        <div className="bg-[#ff3b3b] w-px h-4" />
                        <div className="bg-[#ff3b3b] w-full h-6" />
                        <div className="bg-[#ff3b3b] w-px h-3" />
                      </div>
                      <div className="flex flex-col items-center w-2">
                        <div className="bg-[#00ff88] w-px h-2" />
                        <div className="bg-[#00ff88] w-full h-12" />
                        <div className="bg-[#00ff88] w-px h-3" />
                      </div>
                      <div className="flex flex-col items-center w-2">
                        <div className="bg-[#00ff88] w-px h-5" />
                        <div className="bg-[#00ff88] w-full h-10" />
                        <div className="bg-[#00ff88] w-px h-2" />
                      </div>
                      <div className="flex flex-col items-center w-2">
                        <div className="bg-[#ff3b3b] w-px h-6" />
                        <div className="bg-[#ff3b3b] w-full h-7" />
                        <div className="bg-[#ff3b3b] w-px h-4" />
                      </div>
                      <div className="flex flex-col items-center w-2">
                        <div className="bg-[#ff3b3b] w-px h-3" />
                        <div className="bg-[#ff3b3b] w-full h-5" />
                        <div className="bg-[#ff3b3b] w-px h-2" />
                      </div>
                      <div className="flex flex-col items-center w-2">
                        <div className="bg-[#00ff88] w-px h-4" />
                        <div className="bg-[#00ff88] w-full h-14" />
                        <div className="bg-[#00ff88] w-px h-3" />
                      </div>
                      <div className="flex flex-col items-center w-2">
                        <div className="bg-[#00ff88] w-px h-2" />
                        <div className="bg-[#00ff88] w-full h-9" />
                        <div className="bg-[#00ff88] w-px h-5" />
                      </div>
                      <div className="flex flex-col items-center w-2">
                        <div className="bg-[#ff3b3b] w-px h-5" />
                        <div className="bg-[#ff3b3b] w-full h-6" />
                        <div className="bg-[#ff3b3b] w-px h-2" />
                      </div>
                      <div className="flex flex-col items-center w-2">
                        <div className="bg-[#00ff88] w-px h-3" />
                        <div className="bg-[#00ff88] w-full h-16" />
                        <div className="bg-[#00ff88] w-px h-2" />
                      </div>
                      <div className="flex flex-col items-center w-2">
                        <div className="bg-[#00ff88] w-px h-4" />
                        <div className="bg-[#00ff88] w-full h-11" />
                        <div className="bg-[#00ff88] w-px h-3" />
                      </div>
                    </div>
                  </div>
                  <div className="border-[oklch(1_0_0/0.1)] font-mono text-[11px] border-black/1 border-t-0 border-r-1 border-b-0 border-l-0 border-solid p-3 w-32">
                    <div className="text-[#a1a1a1] text-[10px] mb-1">
                      Price · Size
                    </div>
                    <div className="text-[#ff3b3b] flex justify-between">
                      <span>64,210</span>
                      <span className="text-[#a1a1a1]">0.84</span>
                    </div>
                    <div className="text-[#ff3b3b] flex justify-between">
                      <span>64,205</span>
                      <span className="text-[#a1a1a1]">1.21</span>
                    </div>
                    <div className="rounded-xs bg-[#ff3b3b]/15 text-[#ff3b3b] flex justify-between">
                      <span>64,198</span>
                      <span className="text-[#a1a1a1]">2.05</span>
                    </div>
                    <div className="text-[#ff3b3b] flex justify-between">
                      <span>64,190</span>
                      <span className="text-[#a1a1a1]">0.55</span>
                    </div>
                    <div className="font-bold text-center text-neutral-50 text-sm leading-5 my-1">
                      64,182
                    </div>
                    <div className="rounded-xs bg-[#00ff88]/15 text-[#00ff88] flex justify-between">
                      <span>64,176</span>
                      <span className="text-[#a1a1a1]">1.92</span>
                    </div>
                    <div className="text-[#00ff88] flex justify-between">
                      <span>64,170</span>
                      <span className="text-[#a1a1a1]">0.73</span>
                    </div>
                    <div className="text-[#00ff88] flex justify-between">
                      <span>64,162</span>
                      <span className="text-[#a1a1a1]">1.40</span>
                    </div>
                    <div className="text-[#00ff88] flex justify-between">
                      <span>64,155</span>
                      <span className="text-[#a1a1a1]">2.18</span>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] p-3 w-24">
                    <div className="text-[#a1a1a1] text-[10px] mb-1">
                      Trades
                    </div>
                    <div className="text-[#00ff88] flex justify-between">
                      <span>64,182</span>
                    </div>
                    <div className="rounded-xs bg-[#ff3b3b]/15 text-[#ff3b3b] flex justify-between">
                      <span>64,179</span>
                    </div>
                    <div className="text-[#00ff88] flex justify-between">
                      <span>64,184</span>
                    </div>
                    <div className="rounded-xs bg-[#00ff88]/15 text-[#00ff88] flex justify-between">
                      <span>64,186</span>
                    </div>
                    <div className="text-[#ff3b3b] flex justify-between">
                      <span>64,177</span>
                    </div>
                    <div className="text-[#00ff88] flex justify-between">
                      <span>64,181</span>
                    </div>
                    <div className="text-[#ff3b3b] flex justify-between">
                      <span>64,175</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="bg-[#111114] px-12 py-20 w-full">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="font-bold text-neutral-50 text-4xl leading-10 tracking-tight mb-12">
              Why it feels real
            </h2>
            <div className="grid grid-cols-4 gap-6">
              <Card className="border-[oklch(1_0_0/0.1)] rounded-xl bg-[#0a0a0b] p-6 gap-4">
                <CardHeader className="p-0 gap-2">
                  <div className="size-10 rounded-sm bg-[#00ff88]/15 flex justify-center items-center">
                    <Cpu className="size-5 text-[#00ff88]" />
                  </div>
                  <CardTitle className="font-bold text-neutral-50 text-lg leading-7">
                    Real matching engine
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                    Orders rest, match, and fill against a true price-time
                    priority book.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[oklch(1_0_0/0.1)] rounded-xl bg-[#0a0a0b] p-6 gap-4">
                <CardHeader className="p-0 gap-2">
                  <div className="size-10 rounded-sm bg-[#00ff88]/15 flex justify-center items-center">
                    <Activity className="size-5 text-[#00ff88]" />
                  </div>
                  <CardTitle className="font-bold text-neutral-50 text-lg leading-7">
                    Live, in real time
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                    Streaming order books and trades tape update tick-by-tick,
                    instantly.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[oklch(1_0_0/0.1)] rounded-xl bg-[#0a0a0b] p-6 gap-4">
                <CardHeader className="p-0 gap-2">
                  <div className="size-10 rounded-sm bg-[#00ff88]/15 flex justify-center items-center">
                    <Terminal className="size-5 text-[#00ff88]" />
                  </div>
                  <CardTitle className="font-bold text-neutral-50 text-lg leading-7">
                    Trade by API or build bots
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                    A full REST and WebSocket API lets you automate any strategy
                    you dream up.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-[oklch(1_0_0/0.1)] rounded-xl bg-[#0a0a0b] p-6 gap-4">
                <CardHeader className="p-0 gap-2">
                  <div className="size-10 rounded-sm bg-[#00ff88]/15 flex justify-center items-center">
                    <Trophy className="size-5 text-[#00ff88]" />
                  </div>
                  <CardTitle className="font-bold text-neutral-50 text-lg leading-7">
                    Climb the leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                    Compete on realized PnL and prove your edge against
                    thousands of traders.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="bg-[#0a0a0b] px-12 py-20 w-full">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="font-bold text-neutral-50 text-4xl leading-10 tracking-tight mb-12">
              How it works
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="border-[oklch(1_0_0/0.1)] rounded-xl bg-[#111114] border-black/1 border-1 border-solid p-8">
                <div className="font-mono font-bold text-[#00ff88] text-5xl leading-12 mb-4">
                  01
                </div>
                <h3 className="font-bold text-neutral-50 text-xl leading-7 mb-2">{`Sign up & get virtual credits`}</h3>
                <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                  Create an account in seconds — no deposit, no KYC. Start with
                  a fresh balance of virtual credits.
                </p>
              </div>
              <div className="border-[oklch(1_0_0/0.1)] rounded-xl bg-[#111114] border-black/1 border-1 border-solid p-8">
                <div className="font-mono font-bold text-[#00ff88] text-5xl leading-12 mb-4">
                  02
                </div>
                <h3 className="font-bold text-neutral-50 text-xl leading-7 mb-2">
                  Trade real markets
                </h3>
                <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                  Place orders and watch them fill live against a real matching
                  engine and live order books.
                </p>
              </div>
              <div className="border-[oklch(1_0_0/0.1)] rounded-xl bg-[#111114] border-black/1 border-1 border-solid p-8">
                <div className="font-mono font-bold text-[#00ff88] text-5xl leading-12 mb-4">
                  03
                </div>
                <h3 className="font-bold text-neutral-50 text-xl leading-7 mb-2">{`Track PnL & climb`}</h3>
                <p className="leading-relaxed text-[#a1a1a1] text-sm leading-5">
                  Monitor your realized PnL in real time and rise through the
                  global leaderboard rankings.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#111114] px-12 py-20 w-full">
          <div className="max-w-[900px] text-center mx-auto">
            <h2 className="font-bold text-neutral-50 text-4xl leading-10 tracking-tight mb-2">
              Top traders, right now
            </h2>
            <p className="text-[#a1a1a1] mb-10">
              Live realized PnL, updated every second.
            </p>
            <div className="border-[oklch(1_0_0/0.1)] rounded-xl bg-[#0a0a0b] border-black/1 border-1 border-solid overflow-hidden">
              <div className="grid grid-cols-3 border-[oklch(1_0_0/0.1)] font-medium text-left text-[#a1a1a1] text-xs leading-4 border-black/1 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-6 py-3">
                <span>Rank</span>
                <span>Trader</span>
                <span className="text-right">Realized PnL</span>
              </div>
              <div className="grid grid-cols-3 text-left border-[#ffd700] border-t-0 border-r-0 border-b-0 border-l-2 border-solid px-6 py-4 items-center">
                <span className="font-mono font-bold text-neutral-50 text-lg leading-7">
                  1
                </span>
                <span className="font-mono text-neutral-50 text-sm leading-5">
                  @quantwhale
                </span>
                <span className="font-mono font-bold text-right text-[#00ff88] text-xl leading-7">
                  +248,910
                </span>
              </div>
              <div className="grid grid-cols-3 text-left border-[#c0c0c0] border-t-0 border-r-0 border-b-0 border-l-2 border-solid px-6 py-4 items-center">
                <span className="font-mono font-bold text-neutral-50 text-lg leading-7">
                  2
                </span>
                <span className="font-mono text-neutral-50 text-sm leading-5">
                  @deltaedge
                </span>
                <span className="font-mono font-bold text-right text-[#00ff88] text-xl leading-7">
                  +187,432
                </span>
              </div>
              <div className="grid grid-cols-3 text-left border-[#cd7f32] border-t-0 border-r-0 border-b-0 border-l-2 border-solid px-6 py-4 items-center">
                <span className="font-mono font-bold text-neutral-50 text-lg leading-7">
                  3
                </span>
                <span className="font-mono text-neutral-50 text-sm leading-5">
                  @orderflow_kid
                </span>
                <span className="font-mono font-bold text-right text-[#00ff88] text-xl leading-7">
                  +152,008
                </span>
              </div>
              <div className="grid grid-cols-3 border-transparent text-left border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid px-6 py-4 items-center">
                <span className="font-mono font-bold text-neutral-50 text-lg leading-7">
                  4
                </span>
                <span className="font-mono text-neutral-50 text-sm leading-5">
                  @scalp_machine
                </span>
                <span className="font-mono font-bold text-right text-[#00ff88] text-xl leading-7">
                  +98,540
                </span>
              </div>
              <div className="grid grid-cols-3 border-transparent text-left border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid px-6 py-4 items-center">
                <span className="font-mono font-bold text-neutral-50 text-lg leading-7">
                  5
                </span>
                <span className="font-mono text-neutral-50 text-sm leading-5">
                  @hodl_bot_v3
                </span>
                <span className="font-mono font-bold text-right text-[#00ff88] text-xl leading-7">
                  +76,221
                </span>
              </div>
            </div>
            <button className="inline-flex font-medium text-[#00ff88] text-sm leading-5 mt-6 items-center gap-1">
              See full leaderboard
              <ArrowRight className="size-4" />
            </button>
          </div>
        </section>
        <section className="bg-[#0d0d10] px-12 py-20 w-full">
          <div className="grid max-w-[1600px] grid-cols-2 mx-auto items-center gap-12">
            <div className="border-[oklch(1_0_0/0.1)] rounded-xl bg-[#0a0a0b] border-black/1 border-1 border-solid overflow-hidden">
              <div className="border-[oklch(1_0_0/0.1)] border-black/1 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-4 py-3 items-center gap-2">
                <span className="size-3 rounded-full bg-[#ff3b3b]" />
                <span className="size-3 rounded-full bg-[#ffd700]" />
                <span className="size-3 rounded-full bg-[#00ff88]" />
                <span className="font-mono text-[#a1a1a1] text-xs leading-4 ml-2">
                  place_order.sh
                </span>
              </div>
              <pre className="overflow-x-auto leading-relaxed font-mono text-[13px] p-5">
                <span className="text-[#00ff88]">curl</span>
                <span className="text-neutral-50">
                  -X POST https://api.paperex.io/v1/orders
                </span>
                <span className="text-neutral-50">-H</span>
                <span className="text-[#a1a1a1]">
                  'Authorization: Bearer $API_KEY'
                </span>
                <span className="text-neutral-50">-d</span>
                <span className="text-[#a1a1a1]">'{`{`}</span>
                <span className="text-[#00ff88]">"symbol"</span>
                <span className="text-neutral-50">:</span>
                <span className="text-[#a1a1a1]">"BTC-USDT",</span>
                <span className="text-[#00ff88]">"side"</span>
                <span className="text-neutral-50">:</span>
                <span className="text-[#a1a1a1]">"buy",</span>
                <span className="text-[#00ff88]">"type"</span>
                <span className="text-neutral-50">:</span>
                <span className="text-[#a1a1a1]">"limit",</span>
                <span className="text-[#00ff88]">"price"</span>
                <span className="text-neutral-50">:</span>
                <span className="text-neutral-50">64182.50,</span>
                <span className="text-[#00ff88]">"size"</span>
                <span className="text-neutral-50">:</span>
                <span className="text-neutral-50">0.25</span>
                <span className="text-[#a1a1a1]">{`}`}'</span>
              </pre>
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="leading-tight font-bold text-neutral-50 text-4xl leading-10 tracking-tight">
                Build bots. Test strategies. Ship fast.
              </h2>
              <p className="max-w-md leading-relaxed text-[#a1a1a1] text-base leading-6">
                A complete REST and WebSocket API mirrors the real exchange.
                Prototype trading bots, backtest live, and validate your edge —
                all against a genuine matching engine with zero risk.
              </p>
              <div>
                <Button className="border-[oklch(1_0_0/0.15)] bg-transparent rounded-sm text-neutral-50 text-sm leading-5 border-black/1 border-1 border-solid px-5 h-11">
                  Read the API docs
                  <ArrowRight className="size-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        <footer className="border-[oklch(1_0_0/0.1)] bg-[#0a0a0b] border-black/1 border-t-1 border-r-0 border-b-0 border-l-0 border-solid px-12 py-8 w-full">
          <div className="max-w-[1600px] flex mx-auto justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="size-5 rounded-sm bg-[#00ff88] flex justify-center items-center">
                <CandlestickChart className="size-3 text-black" />
              </div>
              <span className="font-semibold text-[#a1a1a1] text-sm leading-5">
                PaperEx
              </span>
            </div>
            <nav className="text-[#a1a1a1] text-sm leading-5 flex items-center gap-8">
              <button>Features</button>
              <button>How it works</button>
              <button>Leaderboard</button>
              <button>Docs</button>
            </nav>
            <span className="text-[#a1a1a1] text-xs leading-4">
              © 2025 PaperEx. All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
