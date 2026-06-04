import { useEffect } from "react";
import {
  ArrowLeftRight,
  CandlestickChart,
  LineChart as LucideLineChart,
  Trophy,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export default function App() {
  return (
    <div>
      <div className="font-sans bg-neutral-950 text-neutral-50 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <nav className="bg-[#0d0d10] border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-6 justify-between items-center h-12">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-sm bg-[#00ff88] flex justify-center items-center">
              <CandlestickChart className="size-4 text-neutral-950" />
            </div>
            <span className="font-bold text-neutral-50 text-sm leading-5 tracking-tight">
              VeritasDEX
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className="text-[#a1a1a1] text-sm leading-5 px-3 gap-1.5 h-8"
            >
              <LucideLineChart className="size-4" />
              Markets
            </Button>
            <Button
              variant="ghost"
              className="text-[#a1a1a1] text-sm leading-5 px-3 gap-1.5 h-8"
            >
              <ArrowLeftRight className="size-4" />
              Trade
            </Button>
            <div className="relative flex flex-col items-center">
              <Button
                variant="ghost"
                className="font-medium text-neutral-50 text-sm leading-5 px-3 gap-1.5 h-8"
              >
                <Wallet className="size-4" />
                Portfolio
              </Button>
              <span className="size-1.5 rounded-full bg-[#00ff88] absolute -bottom-0.5" />
            </div>
            <Button
              variant="ghost"
              className="text-[#a1a1a1] text-sm leading-5 px-3 gap-1.5 h-8"
            >
              <Trophy className="size-4" />
              Leaderboard
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-neutral-800 border-white/10 border-1 border-solid flex px-3 py-1 items-center gap-1.5">
              <span className="font-mono text-[#00ff88] text-xs leading-4">
                ◎ 50,000.00 VCRD
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-[#00ff88]" />
              <span className="text-[#a1a1a1] text-xs leading-4">Live</span>
            </div>
            <div className="size-7 bg-gradient-to-br from-[#00ff88] to-chart1 font-bold rounded-full text-neutral-950 text-[10px] flex justify-center items-center">
              JD
            </div>
          </div>
        </nav>
        <main className="bg-[#0a0a0b] p-8">
          <h1 className="font-bold text-neutral-50 text-2xl leading-8 mb-6">
            Portfolio
          </h1>
          <div className="grid grid-cols-4 mb-6 gap-4">
            <div className="rounded-sm bg-[#111114] border-white/7.000000000000001 border-1 border-solid flex p-5 flex-col gap-1">
              <span className="uppercase text-[#a1a1a1] text-[11px] tracking-wide">
                Available Balance
              </span>
              <span className="leading-tight font-mono text-neutral-50 text-[28px]">
                48,320.00 VCRD
              </span>
              <span className="text-[#a1a1a1] text-xs leading-4">
                Virtual Credits
              </span>
            </div>
            <div className="rounded-sm bg-[#111114] border-white/7.000000000000001 border-1 border-solid flex p-5 flex-col gap-1">
              <span className="uppercase text-[#a1a1a1] text-[11px] tracking-wide">
                Reserved (in orders)
              </span>
              <span className="leading-tight font-mono text-neutral-50 text-[28px]">
                1,680.00 VCRD
              </span>
              <span className="text-[#a1a1a1] text-xs leading-4">
                Margin / open orders
              </span>
            </div>
            <div className="rounded-sm bg-[#111114] border-white/7.000000000000001 border-1 border-solid flex p-5 flex-col gap-1">
              <span className="uppercase text-[#a1a1a1] text-[11px] tracking-wide">
                Realized PnL
              </span>
              <span className="leading-tight font-mono text-[#00ff88] text-[28px]">
                +3,240.50
              </span>
              <span className="text-[#a1a1a1] text-xs leading-4">All time</span>
            </div>
            <div className="rounded-sm bg-[#111114] border-white/7.000000000000001 border-1 border-solid flex p-5 flex-col gap-1">
              <span className="uppercase text-[#a1a1a1] text-[11px] tracking-wide">
                Unrealized PnL
              </span>
              <span className="leading-tight font-mono text-[#ff3b3b] text-[28px]">
                -120.30
              </span>
              <span className="text-[#a1a1a1] text-xs leading-4">
                Open positions
              </span>
            </div>
          </div>
          <div className="grid grid-cols-[65%_35%] gap-6">
            <div className="flex flex-col gap-6">
              <div className="rounded-sm bg-[#111114] border-white/7.000000000000001 border-1 border-solid p-5">
                <div className="flex mb-4 items-center gap-2">
                  <h2 className="font-bold text-neutral-50 text-base leading-6">
                    Open Positions
                  </h2>
                  <span className="rounded-full bg-[#00ff88]/15 text-[#00ff88] text-[11px] flex px-2 py-0.5 items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#00ff88]" />3
                  </span>
                </div>
                <table className="text-xs leading-4 w-full">
                  <thead>
                    <tr className="uppercase text-[#a1a1a1] text-[11px] border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid">
                      <th className="font-medium text-left py-2">Market</th>
                      <th className="font-medium text-left py-2">Side</th>
                      <th className="font-medium text-right py-2">Qty</th>
                      <th className="font-medium text-right py-2">Avg Entry</th>
                      <th className="font-medium text-right py-2">Mark</th>
                      <th className="font-medium text-right py-2">Liq.</th>
                      <th className="font-medium text-right py-2">
                        Unreal. PnL
                      </th>
                      <th className="font-medium text-right py-2">Realized</th>
                      <th className="font-medium text-center py-2">Close</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr className="border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                      <td className="font-sans font-medium text-neutral-50">
                        BTC-PERP
                      </td>
                      <td>
                        <span className="rounded-sm bg-[#00ff88]/15 text-[#00ff88] text-[10px] px-2 py-0.5">
                          Long
                        </span>
                      </td>
                      <td className="text-right text-neutral-50">0.45</td>
                      <td className="text-right text-[#a1a1a1]">61,200</td>
                      <td className="text-right text-neutral-50">62,840</td>
                      <td className="text-right text-[#a1a1a1]">54,100</td>
                      <td className="text-right text-[#00ff88]">
                        +738.00
                        <span className="text-[#a1a1a1] text-[10px]">
                          +2.6%
                        </span>
                      </td>
                      <td className="text-right text-[#00ff88]">+120.00</td>
                      <td className="text-center">
                        <Button
                          variant="ghost"
                          className="size-6 text-[#ff3b3b] p-0"
                        >
                          <X className="size-3.5" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                      <td className="font-sans font-medium text-neutral-50">
                        ETH-PERP
                      </td>
                      <td>
                        <span className="rounded-sm bg-[#ff3b3b]/15 text-[#ff3b3b] text-[10px] px-2 py-0.5">
                          Short
                        </span>
                      </td>
                      <td className="text-right text-neutral-50">3.20</td>
                      <td className="text-right text-[#a1a1a1]">3,420</td>
                      <td className="text-right text-neutral-50">3,468</td>
                      <td className="text-right text-[#a1a1a1]">3,910</td>
                      <td className="text-right text-[#ff3b3b]">
                        -153.60
                        <span className="text-[#a1a1a1] text-[10px]">
                          -1.4%
                        </span>
                      </td>
                      <td className="text-right text-[#00ff88]">+44.20</td>
                      <td className="text-center">
                        <Button
                          variant="ghost"
                          className="size-6 text-[#ff3b3b] p-0"
                        >
                          <X className="size-3.5" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                      <td className="font-sans font-medium text-neutral-50">
                        SOL-PERP
                      </td>
                      <td>
                        <span className="rounded-sm bg-[#00ff88]/15 text-[#00ff88] text-[10px] px-2 py-0.5">
                          Long
                        </span>
                      </td>
                      <td className="text-right text-neutral-50">120.0</td>
                      <td className="text-right text-[#a1a1a1]">142.50</td>
                      <td className="text-right text-neutral-50">138.10</td>
                      <td className="text-right text-[#a1a1a1]">98.40</td>
                      <td className="text-right text-[#ff3b3b]">
                        -528.00
                        <span className="text-[#a1a1a1] text-[10px]">
                          -3.1%
                        </span>
                      </td>
                      <td className="text-right text-[#00ff88]">+312.50</td>
                      <td className="text-center">
                        <Button
                          variant="ghost"
                          className="size-6 text-[#ff3b3b] p-0"
                        >
                          <X className="size-3.5" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="h-10">
                      <td className="font-sans font-medium text-neutral-50">
                        DOGE-PERP
                      </td>
                      <td>
                        <span className="rounded-sm bg-[#00ff88]/15 text-[#00ff88] text-[10px] px-2 py-0.5">
                          Long
                        </span>
                      </td>
                      <td className="text-right text-neutral-50">8,500</td>
                      <td className="text-right text-[#a1a1a1]">0.1240</td>
                      <td className="text-right text-neutral-50">0.1318</td>
                      <td className="text-right text-[#a1a1a1]">0.0810</td>
                      <td className="text-right text-[#00ff88]">
                        +66.30
                        <span className="text-[#a1a1a1] text-[10px]">
                          +6.3%
                        </span>
                      </td>
                      <td className="text-right text-[#ff3b3b]">-18.40</td>
                      <td className="text-center">
                        <Button
                          variant="ghost"
                          className="size-6 text-[#ff3b3b] p-0"
                        >
                          <X className="size-3.5" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="rounded-sm bg-[#111114] border-white/7.000000000000001 border-1 border-solid p-5">
                <h2 className="font-bold text-neutral-50 text-base leading-6 mb-4">
                  Order History
                </h2>
                <table className="text-xs leading-4 w-full">
                  <thead>
                    <tr className="uppercase text-[#a1a1a1] text-[11px] border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid">
                      <th className="font-medium text-left py-2">Time</th>
                      <th className="font-medium text-left py-2">Market</th>
                      <th className="font-medium text-left py-2">Type</th>
                      <th className="font-medium text-left py-2">Side</th>
                      <th className="font-medium text-right py-2">Price</th>
                      <th className="font-medium text-right py-2">Qty</th>
                      <th className="font-medium text-right py-2">Filled</th>
                      <th className="font-medium text-right py-2">Fee</th>
                      <th className="font-medium text-right py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr className="border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                      <td className="text-[#a1a1a1]">14:32:08</td>
                      <td className="font-sans text-neutral-50">BTC-PERP</td>
                      <td className="text-[#a1a1a1]">Limit</td>
                      <td className="text-[#00ff88]">Buy</td>
                      <td className="text-right text-neutral-50">61,200</td>
                      <td className="text-right text-neutral-50">0.45</td>
                      <td className="text-right text-neutral-50">100%</td>
                      <td className="text-right text-[#a1a1a1]">2.75</td>
                      <td className="text-right">
                        <span className="rounded-sm bg-[#00ff88]/15 text-[#00ff88] text-[10px] px-2 py-0.5">
                          Filled
                        </span>
                      </td>
                    </tr>
                    <tr className="border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                      <td className="text-[#a1a1a1]">14:18:41</td>
                      <td className="font-sans text-neutral-50">ETH-PERP</td>
                      <td className="text-[#a1a1a1]">Market</td>
                      <td className="text-[#ff3b3b]">Sell</td>
                      <td className="text-right text-neutral-50">3,420</td>
                      <td className="text-right text-neutral-50">3.20</td>
                      <td className="text-right text-neutral-50">100%</td>
                      <td className="text-right text-[#a1a1a1]">1.64</td>
                      <td className="text-right">
                        <span className="rounded-sm bg-[#00ff88]/15 text-[#00ff88] text-[10px] px-2 py-0.5">
                          Filled
                        </span>
                      </td>
                    </tr>
                    <tr className="border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                      <td className="text-[#a1a1a1]">13:55:12</td>
                      <td className="font-sans text-neutral-50">SOL-PERP</td>
                      <td className="text-[#a1a1a1]">Limit</td>
                      <td className="text-[#00ff88]">Buy</td>
                      <td className="text-right text-neutral-50">142.50</td>
                      <td className="text-right text-neutral-50">120.0</td>
                      <td className="text-right text-neutral-50">100%</td>
                      <td className="text-right text-[#a1a1a1]">0.85</td>
                      <td className="text-right">
                        <span className="rounded-sm bg-[#00ff88]/15 text-[#00ff88] text-[10px] px-2 py-0.5">
                          Filled
                        </span>
                      </td>
                    </tr>
                    <tr className="border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                      <td className="text-[#a1a1a1]">13:40:33</td>
                      <td className="font-sans text-neutral-50">DOGE-PERP</td>
                      <td className="text-[#a1a1a1]">Limit</td>
                      <td className="text-[#00ff88]">Buy</td>
                      <td className="text-right text-neutral-50">0.1240</td>
                      <td className="text-right text-neutral-50">8,500</td>
                      <td className="text-right text-yellow-400">62%</td>
                      <td className="text-right text-[#a1a1a1]">0.31</td>
                      <td className="text-right">
                        <span className="rounded-sm bg-yellow-400/15 text-yellow-400 text-[10px] px-2 py-0.5">
                          Partial
                        </span>
                      </td>
                    </tr>
                    <tr className="border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                      <td className="text-[#a1a1a1]">12:22:09</td>
                      <td className="font-sans text-neutral-50">BTC-PERP</td>
                      <td className="text-[#a1a1a1]">Limit</td>
                      <td className="text-[#ff3b3b]">Sell</td>
                      <td className="text-right text-neutral-50">65,000</td>
                      <td className="text-right text-neutral-50">0.20</td>
                      <td className="text-right text-[#a1a1a1]">0%</td>
                      <td className="text-right text-[#a1a1a1]">0.00</td>
                      <td className="text-right">
                        <span className="rounded-sm bg-neutral-800 text-[#a1a1a1] text-[10px] px-2 py-0.5">
                          Cancelled
                        </span>
                      </td>
                    </tr>
                    <tr className="border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                      <td className="text-[#a1a1a1]">11:48:50</td>
                      <td className="font-sans text-neutral-50">ETH-PERP</td>
                      <td className="text-[#a1a1a1]">Market</td>
                      <td className="text-[#00ff88]">Buy</td>
                      <td className="text-right text-neutral-50">3,380</td>
                      <td className="text-right text-neutral-50">1.50</td>
                      <td className="text-right text-neutral-50">100%</td>
                      <td className="text-right text-[#a1a1a1]">0.76</td>
                      <td className="text-right">
                        <span className="rounded-sm bg-[#00ff88]/15 text-[#00ff88] text-[10px] px-2 py-0.5">
                          Filled
                        </span>
                      </td>
                    </tr>
                    <tr className="border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                      <td className="text-[#a1a1a1]">10:30:17</td>
                      <td className="font-sans text-neutral-50">SOL-PERP</td>
                      <td className="text-[#a1a1a1]">Limit</td>
                      <td className="text-[#ff3b3b]">Sell</td>
                      <td className="text-right text-neutral-50">150.00</td>
                      <td className="text-right text-neutral-50">40.0</td>
                      <td className="text-right text-[#a1a1a1]">0%</td>
                      <td className="text-right text-[#a1a1a1]">0.00</td>
                      <td className="text-right">
                        <span className="rounded-sm bg-neutral-800 text-[#a1a1a1] text-[10px] px-2 py-0.5">
                          Cancelled
                        </span>
                      </td>
                    </tr>
                    <tr className="h-10">
                      <td className="text-[#a1a1a1]">09:14:02</td>
                      <td className="font-sans text-neutral-50">DOGE-PERP</td>
                      <td className="text-[#a1a1a1]">Market</td>
                      <td className="text-[#00ff88]">Buy</td>
                      <td className="text-right text-neutral-50">0.1180</td>
                      <td className="text-right text-neutral-50">8,500</td>
                      <td className="text-right text-neutral-50">100%</td>
                      <td className="text-right text-[#a1a1a1]">0.42</td>
                      <td className="text-right">
                        <span className="rounded-sm bg-[#00ff88]/15 text-[#00ff88] text-[10px] px-2 py-0.5">
                          Filled
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-sm bg-[#111114] border-white/7.000000000000001 border-1 border-solid flex p-5 flex-col gap-2">
                <span className="uppercase text-[#a1a1a1] text-[11px] tracking-wide">
                  Total Portfolio Value
                </span>
                <div className="flex items-center gap-3">
                  <span className="leading-tight font-mono text-neutral-50 text-[28px]">
                    51,560.20 VCRD
                  </span>
                  <span className="font-mono rounded-full bg-[#00ff88]/15 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                    +6.48%
                  </span>
                </div>
              </div>
              <div className="rounded-sm bg-[#0d0d10] border-white/7.000000000000001 border-1 border-solid flex p-5 flex-col h-70">
                <span className="font-medium text-[#a1a1a1] text-xs leading-4 mb-2">
                  Equity Curve
                </span>
                <ChartContainer
                  config={{
                    value: {
                      label: "Value",
                      color: "oklch(0.696 0.17 162.48)",
                    },
                  }}
                  className="flex-1 w-full"
                >
                  <RechartsAreaChart
                    data={[
                      { date: "Jan", value: 50000 },
                      { date: "Feb", value: 49200 },
                      { date: "Mar", value: 50800 },
                      { date: "Apr", value: 50100 },
                      { date: "May", value: 51900 },
                      { date: "Jun", value: 51100 },
                      { date: "Jul", value: 51560 },
                    ]}
                  >
                    <defs>
                      <linearGradient id="eq" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#00ff88"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="100%"
                          stopColor="#00ff88"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(1 0 0 / 6%)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "oklch(0.708 0 0)", fontSize: 10 }}
                    />
                    <YAxis
                      orientation="right"
                      tickLine={false}
                      axisLine={false}
                      tick={{
                        fill: "oklch(0.708 0 0)",
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                      domain={["dataMin - 1000", "dataMax + 1000"]}
                    />
                    <ChartTooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#00ff88"
                      strokeWidth={2}
                      fill="url(#eq)"
                    />
                  </RechartsAreaChart>
                </ChartContainer>
              </div>
              <div className="rounded-sm bg-[#111114] border-white/7.000000000000001 border-1 border-solid p-5">
                <h2 className="font-bold text-neutral-50 text-base leading-6 mb-4">
                  PnL by Market
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-neutral-50 text-xs leading-4 w-20">
                      BTC-PERP
                    </span>
                    <div className="rounded-full bg-neutral-800 flex-1 h-1.5 overflow-hidden">
                      <div className="w-[80%] rounded-full bg-[#00ff88] h-full" />
                    </div>
                    <span className="font-mono text-right text-[#00ff88] text-xs leading-4 w-20">
                      +1,420.00
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-neutral-50 text-xs leading-4 w-20">
                      SOL-PERP
                    </span>
                    <div className="rounded-full bg-neutral-800 flex-1 h-1.5 overflow-hidden">
                      <div className="w-[55%] rounded-full bg-[#00ff88] h-full" />
                    </div>
                    <span className="font-mono text-right text-[#00ff88] text-xs leading-4 w-20">
                      +980.50
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-neutral-50 text-xs leading-4 w-20">
                      ETH-PERP
                    </span>
                    <div className="rounded-full bg-neutral-800 flex-1 h-1.5 overflow-hidden">
                      <div className="w-[42%] rounded-full bg-[#00ff88] h-full" />
                    </div>
                    <span className="font-mono text-right text-[#00ff88] text-xs leading-4 w-20">
                      +640.20
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-neutral-50 text-xs leading-4 w-20">
                      DOGE-PERP
                    </span>
                    <div className="rounded-full bg-neutral-800 flex-1 h-1.5 overflow-hidden">
                      <div className="w-[25%] rounded-full bg-[#ff3b3b] h-full" />
                    </div>
                    <span className="font-mono text-right text-[#ff3b3b] text-xs leading-4 w-20">
                      -310.40
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-neutral-50 text-xs leading-4 w-20">
                      AVAX-PERP
                    </span>
                    <div className="rounded-full bg-neutral-800 flex-1 h-1.5 overflow-hidden">
                      <div className="w-[15%] rounded-full bg-[#ff3b3b] h-full" />
                    </div>
                    <span className="font-mono text-right text-[#ff3b3b] text-xs leading-4 w-20">
                      -189.80
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
