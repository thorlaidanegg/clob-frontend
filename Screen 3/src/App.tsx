import { useEffect } from "react";
import {
  ArrowDownWideNarrow,
  CandlestickChart,
  ChevronDown,
  ChevronsUpDown,
  LineChart as LucideLineChart,
  Search,
  Trophy,
  Wallet,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function App() {
  return (
    <div>
      <div className="font-sans bg-neutral-950 text-neutral-50 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <nav className="bg-[#0d0d10] border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-6 justify-between items-center h-12">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-[#00ff88] flex justify-center items-center">
              <CandlestickChart className="size-4 text-black" />
            </div>
            <span className="font-bold text-sm leading-5 tracking-tight">
              VaporCard
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="relative flex px-3 py-1.5 items-center gap-1.5">
              <LucideLineChart className="size-3.5 text-neutral-50" />
              <span className="font-medium text-neutral-50 text-sm leading-5">
                Markets
              </span>
              <span className="left-1/2 -translate-x-1/2 size-1 rounded-full bg-[#00ff88] absolute -bottom-0.5" />
            </div>
            <Button variant="ghost" className="text-[#a1a1a1] px-3 gap-1.5 h-8">
              <Zap className="size-3.5" />
              <span className="text-sm leading-5">Trade</span>
            </Button>
            <Button variant="ghost" className="text-[#a1a1a1] px-3 gap-1.5 h-8">
              <Wallet className="size-3.5" />
              <span className="text-sm leading-5">Portfolio</span>
            </Button>
            <Button variant="ghost" className="text-[#a1a1a1] px-3 gap-1.5 h-8">
              <Trophy className="size-3.5" />
              <span className="text-sm leading-5">Leaderboard</span>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#0a0a0b] border-white/10 border-1 border-solid flex px-2.5 py-1 items-center gap-1.5">
              <span className="font-mono text-[#00ff88] text-xs leading-4">
                ◎ 50,000.00 VCRD
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#00ff88]" />
              <span className="text-[#a1a1a1] text-xs leading-4">Live</span>
            </div>
            <div className="size-7 font-semibold rounded-full bg-neutral-800 text-xs leading-4 flex justify-center items-center">
              JD
            </div>
          </div>
        </nav>
        <div className="p-8">
          <div className="flex mb-6 justify-between items-center">
            <h1 className="font-bold text-2xl leading-8 tracking-tight">
              Markets
            </h1>
            <div className="relative w-70">
              <Search className="top-1/2 -translate-y-1/2 size-4 text-[#a1a1a1] absolute left-3" />
              <Input
                className="bg-[#0d0d10] text-sm leading-5 border-white/10 border-0 border-solid pl-9 h-9"
                placeholder="Search markets…"
              />
            </div>
          </div>
          <div className="flex mb-4 justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="rounded-full text-neutral-50 text-sm leading-5 border-[#00ff88] border-0 border-solid px-4 h-8"
              >
                All
              </Button>
              <Button
                variant="ghost"
                className="rounded-full text-[#a1a1a1] text-sm leading-5 border-white/10 border-1 border-solid px-4 h-8"
              >
                Spot
              </Button>
              <Button
                variant="ghost"
                className="rounded-full text-[#a1a1a1] text-sm leading-5 border-white/10 border-1 border-solid px-4 h-8"
              >
                Perpetuals
              </Button>
            </div>
            <Button
              variant="outline"
              className="bg-[#0d0d10] text-[#a1a1a1] text-sm leading-5 border-white/10 border-0 border-solid px-3 gap-2 h-8"
            >
              <ArrowDownWideNarrow className="size-4" />
              <span>Sort by: Volume ↓</span>
              <ChevronDown className="size-4" />
            </Button>
          </div>
          <div className="rounded-lg border-white border-1 border-solid overflow-hidden">
            <table className="border-collapse w-full">
              <thead className="sticky z-10 top-0">
                <tr className="uppercase bg-[#111114] text-[#a1a1a1] text-[11px] tracking-wider border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid">
                  <th className="font-medium text-left px-4 py-3 w-12">#</th>
                  <th className="font-medium text-left px-4 py-3">Symbol</th>
                  <th className="font-medium text-right px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      Last Price
                      <ChevronsUpDown className="size-3 opacity-50" />
                    </span>
                  </th>
                  <th className="font-medium text-right px-4 py-3">
                    24h Change
                  </th>
                  <th className="font-medium text-right px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      24h Volume
                      <ChevronDown className="size-3 text-[#00ff88]" />
                    </span>
                  </th>
                  <th className="font-medium text-right px-4 py-3">
                    Market Cap
                  </th>
                  <th className="font-medium text-right px-4 py-3">Trades</th>
                  <th className="font-medium text-center px-4 py-3">
                    Sparkline
                  </th>
                  <th className="font-medium text-right px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm leading-5">
                <tr className="bg-[#0d0d10] border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">1</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#f7931a]/20 text-[#f7931a] text-[10px] flex justify-center items-center">
                        ₿
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">BTC/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Bitcoin
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">43,251.80</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#00ff88]/20 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                      +2.34%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    1,284.5M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    846.2B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    38,219
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,18 10,16 20,19 30,12 40,14 50,7 60,4"
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">2</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#627eea]/20 text-[#627eea] text-[10px] flex justify-center items-center">
                        Ξ
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">ETH/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Ethereum
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">2,287.40</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#00ff88]/20 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                      +1.87%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    982.1M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    275.4B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    29,810
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,16 10,17 20,12 30,14 40,9 50,11 60,6"
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="bg-[#0d0d10] border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">3</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#f3ba2f]/20 text-[#f3ba2f] text-[10px] flex justify-center items-center">
                        B
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">BNB/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">BNB</span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">312.65</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#ff3b3b]/20 text-[#ff3b3b] text-xs leading-4 px-2 py-0.5">
                      -1.12%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    421.7M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    48.2B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    14,203
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,8 10,7 20,11 30,10 40,14 50,16 60,18"
                        fill="none"
                        stroke="#ff3b3b"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">4</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#00ffa3]/20 text-[#00ffa3] text-[10px] flex justify-center items-center">
                        S
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">SOL/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Solana
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">98.42</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#00ff88]/20 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                      +5.61%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    388.9M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    42.1B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    22,475
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,20 10,17 20,18 30,11 40,9 50,5 60,3"
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="bg-[#0d0d10] border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">5</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#23292f]/40 text-neutral-50 text-[10px] flex justify-center items-center">
                        X
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">XRP/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Ripple
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">0.6124</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#ff3b3b]/20 text-[#ff3b3b] text-xs leading-4 px-2 py-0.5">
                      -0.84%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    201.3M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    33.1B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    9,872
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,10 10,9 20,13 30,12 40,15 50,14 60,17"
                        fill="none"
                        stroke="#ff3b3b"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">6</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#0033ad]/30 text-[#3468d1] text-[10px] flex justify-center items-center">
                        A
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">ADA/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Cardano
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">0.4521</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#00ff88]/20 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                      +3.12%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    156.8M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    15.9B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    7,210
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,17 10,15 20,16 30,10 40,12 50,8 60,6"
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="bg-[#0d0d10] border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">7</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#e84142]/20 text-[#e84142] text-[10px] flex justify-center items-center">
                        A
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">AVAX/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Avalanche
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">36.18</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#00ff88]/20 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                      +4.05%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    142.2M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    13.7B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    6,548
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,19 10,16 20,15 30,13 40,10 50,9 60,5"
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">8</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#ba9f33]/20 text-[#e0c662] text-[10px] flex justify-center items-center">
                        D
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">DOGE/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Dogecoin
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">0.0821</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#ff3b3b]/20 text-[#ff3b3b] text-xs leading-4 px-2 py-0.5">
                      -2.41%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    118.5M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    11.6B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    5,902
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,7 10,9 20,8 30,12 40,13 50,17 60,19"
                        fill="none"
                        stroke="#ff3b3b"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="bg-[#0d0d10] border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">9</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#e6007a]/20 text-[#e6007a] text-[10px] flex justify-center items-center">
                        P
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">DOT/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Polkadot
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">7.28</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#00ff88]/20 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                      +0.92%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    98.7M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    9.4B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    4,318
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,14 10,13 20,12 30,11 40,12 50,9 60,8"
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">10</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#2a5ada]/20 text-[#2a5ada] text-[10px] flex justify-center items-center">
                        L
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">LINK/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Chainlink
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">14.92</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#00ff88]/20 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                      +2.78%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    87.3M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    8.7B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    3,991
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,16 10,15 20,13 30,14 40,10 50,9 60,7"
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="bg-[#0d0d10] border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">11</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#8247e5]/20 text-[#8247e5] text-[10px] flex justify-center items-center">
                        M
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">MATIC/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Polygon
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">0.8742</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#ff3b3b]/20 text-[#ff3b3b] text-xs leading-4 px-2 py-0.5">
                      -1.55%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    76.1M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    8.1B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    3,602
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,9 10,10 20,9 30,13 40,12 50,15 60,17"
                        fill="none"
                        stroke="#ff3b3b"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">12</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#ff007a]/20 text-[#ff007a] text-[10px] flex justify-center items-center">
                        U
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">UNI/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Uniswap
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">6.34</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#00ff88]/20 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                      +1.20%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    64.8M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    6.9B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    3,104
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,15 10,14 20,13 30,12 40,11 50,10 60,8"
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="bg-[#0d0d10] border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">13</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#345d9d]/30 text-[#5b8bd6] text-[10px] flex justify-center items-center">
                        L
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">LTC/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Litecoin
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">72.18</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#ff3b3b]/20 text-[#ff3b3b] text-xs leading-4 px-2 py-0.5">
                      -0.67%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    58.2M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    5.4B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    2,810
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,11 10,12 20,11 30,13 40,14 50,15 60,16"
                        fill="none"
                        stroke="#ff3b3b"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">14</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#ff5733]/20 text-[#ff5733] text-[10px] flex justify-center items-center">
                        A
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">ATOM/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Cosmos
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">9.84</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#00ff88]/20 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                      +3.45%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    49.7M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    3.8B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    2,245
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,18 10,16 20,15 30,12 40,11 50,8 60,6"
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="bg-[#0d0d10] border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">15</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#c2a633]/20 text-[#d4b94a] text-[10px] flex justify-center items-center">
                        N
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">NEAR/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">NEAR</span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">3.42</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#00ff88]/20 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                      +6.18%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    44.1M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    3.6B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    2,018
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,20 10,18 20,16 30,13 40,10 50,6 60,3"
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">16</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#bfbbbb]/20 text-[#cfcaca] text-[10px] flex justify-center items-center">
                        F
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">FIL/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Filecoin
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">5.16</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#ff3b3b]/20 text-[#ff3b3b] text-xs leading-4 px-2 py-0.5">
                      -3.02%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    38.9M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    2.9B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    1,742
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,6 10,8 20,10 30,11 40,14 50,16 60,20"
                        fill="none"
                        stroke="#ff3b3b"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="bg-[#0d0d10] border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">17</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#ed1f24]/20 text-[#ed1f24] text-[10px] flex justify-center items-center">
                        A
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">APT/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Aptos
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">8.27</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#00ff88]/20 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                      +1.94%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    33.4M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    2.5B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    1,503
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,15 10,14 20,12 30,13 40,11 50,9 60,7"
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
                <tr className="border-white border-t-0 border-r-0 border-b-1 border-l-0 border-solid h-10">
                  <td className="font-mono text-[#a1a1a1] px-4">18</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 font-bold rounded-full bg-[#13b5ec]/20 text-[#13b5ec] text-[10px] flex justify-center items-center">
                        I
                      </div>
                      <div className="leading-tight flex flex-col">
                        <span className="font-bold">ICP/USDT</span>
                        <span className="text-[#a1a1a1] text-[11px]">
                          Internet Computer
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-right px-4">4.91</td>
                  <td className="text-right px-4">
                    <span className="font-mono rounded-sm bg-[#ff3b3b]/20 text-[#ff3b3b] text-xs leading-4 px-2 py-0.5">
                      -0.48%
                    </span>
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    28.7M
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    2.2B
                  </td>
                  <td className="font-mono text-right text-[#a1a1a1] px-4">
                    1,287
                  </td>
                  <td className="px-4">
                    <svg
                      width="60"
                      height="24"
                      viewBox="0 0 60 24"
                      className="mx-auto"
                    >
                      <polyline
                        points="0,12 10,11 20,12 30,13 40,12 50,14 60,15"
                        fill="none"
                        stroke="#ff3b3b"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </td>
                  <td className="text-right px-4">
                    <Button
                      variant="outline"
                      className="rounded-sm text-[#00ff88] text-xs leading-4 border-[#00ff88] border-0 border-solid px-3 h-7"
                    >
                      Trade →
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex pt-6 justify-center items-center">
            <Button
              variant="ghost"
              className="text-[#a1a1a1] text-sm leading-5 px-6 gap-2 h-9"
            >
              <ChevronDown className="size-4" />
              Load more markets
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
