import { useEffect } from "react";
import {
  BookOpen,
  CandlestickChart,
  Trophy,
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function App() {
  return (
    <div>
      <div className="font-sans bg-neutral-950 text-neutral-50 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <header className="bg-[#0d0d10] border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-6 justify-between items-center h-12">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-[#00ff88] flex justify-center items-center">
              <CandlestickChart className="size-4 text-black" />
            </div>
            <span className="font-bold text-neutral-50 tracking-tight">
              VaultCard
            </span>
          </div>
          <nav className="flex justify-center items-center gap-1">
            <Button
              variant="ghost"
              className="text-[#a1a1a1] text-sm leading-5 px-3 gap-2 h-8"
            >
              <Zap className="size-4" />
              Markets
            </Button>
            <Button
              variant="ghost"
              className="text-[#a1a1a1] text-sm leading-5 px-3 gap-2 h-8"
            >
              <Workflow className="size-4" />
              Trade
            </Button>
            <Button
              variant="ghost"
              className="text-[#a1a1a1] text-sm leading-5 px-3 gap-2 h-8"
            >
              <BookOpen className="size-4" />
              Portfolio
            </Button>
            <div className="relative flex flex-col items-center">
              <Button
                variant="ghost"
                className="text-neutral-50 text-sm leading-5 px-3 gap-2 h-8"
              >
                <Trophy className="size-4 text-[#00ff88]" />
                Leaderboard
              </Button>
              <span className="size-1.5 rounded-full bg-[#00ff88] absolute -bottom-1" />
            </div>
          </nav>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-neutral-800 border-white/10 border-1 border-solid flex px-3 items-center gap-2 h-7">
              <span className="font-mono text-[#00ff88] text-xs leading-4">
                ◎ 50,000.00 VCRD
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-[#00ff88]" />
              <span className="text-[#a1a1a1] text-xs leading-4">Live</span>
            </div>
            <div className="size-7 font-medium rounded-full bg-neutral-800 text-xs leading-4 border-white/10 border-1 border-solid flex justify-center items-center">
              JD
            </div>
          </div>
        </header>
        <main className="px-12 py-8">
          <div className="flex mb-6 justify-between items-center">
            <h1 className="font-bold text-neutral-50 text-[28px] tracking-tight">
              Leaderboard
            </h1>
            <div className="rounded-full bg-neutral-900 border-white/10 border-1 border-solid flex p-1 items-center gap-1">
              <button className="font-medium rounded-full bg-[#00ff88] text-black text-xs leading-4 px-4 h-7">
                Global
              </button>
              <button className="font-medium rounded-full text-[#a1a1a1] text-xs leading-4 px-4 h-7">
                BTC/USDT
              </button>
              <button className="font-medium rounded-full text-[#a1a1a1] text-xs leading-4 px-4 h-7">
                ETH/USDT
              </button>
            </div>
          </div>
          <div className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex mb-8 items-center gap-6">
            <div className="flex -mb-px pb-2 flex-col items-center">
              <span className="font-medium text-neutral-50 text-sm leading-5">
                24h
              </span>
              <span className="rounded-full bg-[#00ff88] mt-1 w-full h-0.5" />
            </div>
            <span className="cursor-pointer text-[#a1a1a1] text-sm leading-5 pb-2">
              7d
            </span>
            <span className="cursor-pointer text-[#a1a1a1] text-sm leading-5 pb-2">
              30d
            </span>
            <span className="cursor-pointer text-[#a1a1a1] text-sm leading-5 pb-2">
              All time
            </span>
          </div>
          <div className="flex mb-8 justify-center items-end gap-6">
            <Card className="border-l-[#c0c0c0] border-y rounded-xl bg-[#161618] border-white/10 border-t-0 border-r-1 border-b-0 border-l-3 border-solid p-6 justify-center gap-2 w-75 h-35">
              <CardContent className="flex p-0 items-center gap-3">
                <span className="text-3xl leading-9">🥈</span>
                <div className="size-10 font-semibold rounded-full bg-neutral-800 text-xs leading-4 border-white/10 border-1 border-solid flex justify-center items-center">
                  KM
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-neutral-50 text-sm leading-5">
                    @kira_moon
                  </span>
                  <span className="font-mono font-semibold text-[#00ff88] text-2xl leading-8">
                    +$98,420.00
                  </span>
                  <span className="font-medium text-[#c0c0c0] text-[11px]">
                    Rank #2
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-[#ffd700] border-y shadow-[0_0_40px_-12px_rgba(255,215,0,0.25)] rounded-xl bg-[#161618] border-white/10 border-t-0 border-r-1 border-b-0 border-l-3 border-solid p-6 justify-center gap-2 w-75 h-40">
              <CardContent className="flex p-0 items-center gap-3">
                <span className="text-4xl leading-10">🥇</span>
                <div className="size-12 font-semibold rounded-full bg-neutral-800 text-sm leading-5 border-white/10 border-1 border-solid flex justify-center items-center">
                  AX
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-neutral-50">
                    @apex_trader
                  </span>
                  <span className="leading-none font-mono font-bold text-[#00ff88] text-[32px]">
                    +$124,830.00
                  </span>
                  <span className="font-medium text-[#ffd700] text-xs leading-4">
                    Rank #1
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-[#cd7f32] border-y rounded-xl bg-[#161618] border-white/10 border-t-0 border-r-1 border-b-0 border-l-3 border-solid p-6 justify-center gap-2 w-75 h-35">
              <CardContent className="flex p-0 items-center gap-3">
                <span className="text-3xl leading-9">🥉</span>
                <div className="size-10 font-semibold rounded-full bg-neutral-800 text-xs leading-4 border-white/10 border-1 border-solid flex justify-center items-center">
                  LV
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-neutral-50 text-sm leading-5">
                    @luna_void
                  </span>
                  <span className="font-mono font-semibold text-[#00ff88] text-2xl leading-8">
                    +$76,210.00
                  </span>
                  <span className="font-medium text-[#cd7f32] text-[11px]">
                    Rank #3
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="rounded-xl bg-neutral-900 border-white/10 border-1 border-solid overflow-hidden">
            <table className="text-sm leading-5 w-full">
              <thead>
                <tr className="uppercase bg-[#111114] text-[#a1a1a1] text-[11px] tracking-wider">
                  <th className="font-medium text-left px-4 py-3 w-16">Rank</th>
                  <th className="font-medium text-left px-4 py-3">Trader</th>
                  <th className="font-medium text-right px-4 py-3">
                    Realized PnL
                  </th>
                  <th className="font-medium text-right px-4 py-3">
                    Unrealized PnL
                  </th>
                  <th className="font-medium text-right px-4 py-3">Win Rate</th>
                  <th className="font-medium text-right px-4 py-3">
                    Total Trades
                  </th>
                  <th className="font-medium text-right px-4 py-3">
                    Best Trade
                  </th>
                  <th className="font-medium text-right px-4 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">4</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        NX
                      </div>
                      <span className="text-neutral-50">@neo_x</span>
                      <span>🇺🇸</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$62,180.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$4,120.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    71.2%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    842
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$12,400.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Jan 2024</td>
                </tr>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">5</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        SR
                      </div>
                      <span className="text-neutral-50">@sol_rider</span>
                      <span>🇯🇵</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$54,902.00
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    -$1,840.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    64.8%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    611
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$9,850.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Mar 2024</td>
                </tr>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">6</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        VG
                      </div>
                      <span className="text-neutral-50">@vega_g</span>
                      <span>🇩🇪</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$48,330.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$2,710.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    58.1%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    1,204
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$7,600.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Feb 2024</td>
                </tr>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">7</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        QB
                      </div>
                      <span className="text-neutral-50">@quant_bee</span>
                      <span>🇬🇧</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$41,560.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$980.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    62.4%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    733
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$6,210.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Apr 2024</td>
                </tr>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">8</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        MZ
                      </div>
                      <span className="text-neutral-50">@mango_z</span>
                      <span>🇧🇷</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$37,890.00
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    -$3,240.00
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    47.9%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    988
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$5,400.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Jan 2024</td>
                </tr>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">9</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        TW
                      </div>
                      <span className="text-neutral-50">@tide_w</span>
                      <span>🇰🇷</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$33,120.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$1,560.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    55.0%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    540
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$4,900.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">May 2024</td>
                </tr>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">10</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        CF
                      </div>
                      <span className="text-neutral-50">@cipher_f</span>
                      <span>🇫🇷</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$28,740.00
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    -$620.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    53.7%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    412
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$3,800.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Jun 2024</td>
                </tr>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">11</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        OR
                      </div>
                      <span className="text-neutral-50">@orbit_r</span>
                      <span>🇨🇦</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$24,560.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$430.00
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    49.2%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    377
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$3,100.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Jul 2024</td>
                </tr>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">12</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        NB
                      </div>
                      <span className="text-neutral-50">@nova_b</span>
                      <span>🇦🇺</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$21,300.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$2,100.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    60.5%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    298
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$2,700.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Aug 2024</td>
                </tr>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">13</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        HP
                      </div>
                      <span className="text-neutral-50">@helix_p</span>
                      <span>🇸🇬</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    -$4,820.00
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    -$1,210.00
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    42.1%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    189
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$1,900.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Sep 2024</td>
                </tr>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">14</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        DY
                      </div>
                      <span className="text-neutral-50">@delta_y</span>
                      <span>🇮🇳</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    -$8,940.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$310.00
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    38.6%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    144
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$1,200.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Oct 2024</td>
                </tr>
                <tr className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">15</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-neutral-800 text-[10px] flex justify-center items-center">
                        ZP
                      </div>
                      <span className="text-neutral-50">@zen_p</span>
                      <span>🇳🇱</span>
                    </div>
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    -$12,510.00
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    -$2,640.00
                  </td>
                  <td className="font-mono text-right text-[#ff3b3b] px-4">
                    31.4%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    97
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$680.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Nov 2024</td>
                </tr>
                <tr className="border-l-[#00ff88] bg-[#10231a] border-black/1 border-t-0 border-r-0 border-b-0 border-l-3 border-solid h-10">
                  <td className="font-mono font-semibold text-neutral-50 px-4">
                    128
                  </td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 font-semibold rounded-full bg-[#00ff88] text-black text-[10px] flex justify-center items-center">
                        JD
                      </div>
                      <span className="font-semibold text-neutral-50">
                        @you_jd
                      </span>
                      <span>🇺🇸</span>
                      <span className="font-medium rounded-sm bg-[#00ff88] text-black text-[10px] px-1.5 py-0.5">
                        YOU
                      </span>
                    </div>
                  </td>
                  <td className="font-mono font-semibold text-right text-[#00ff88] px-4">
                    +$3,420.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$120.00
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    52.8%
                  </td>
                  <td className="font-mono text-right text-neutral-50 px-4">
                    64
                  </td>
                  <td className="font-mono text-right text-[#00ff88] px-4">
                    +$890.00
                  </td>
                  <td className="text-right text-[#a1a1a1] px-4">Dec 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-[#a1a1a1] text-xs leading-4 flex mt-3 items-center gap-2">
            <span className="size-1.5 animate-pulse rounded-full bg-[#00ff88]" />
            Updated live · refreshes every 5s
          </div>
        </main>
      </div>
    </div>
  );
}
