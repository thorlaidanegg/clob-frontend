import { useEffect } from "react";
import {
  Activity,
  CandlestickChart,
  ChevronDown,
  Circle,
  LayoutGrid,
  TrendingUp,
  Trophy,
  User,
  Wallet,
  X,
} from "lucide-react";

export default function App() {
  return (
    <div>
      <div className="font-mono bg-neutral-950 text-neutral-50 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="bg-[#0d0d10] border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-4 justify-between items-center h-12">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CandlestickChart className="size-5 text-[#00ff88]" />
              <span className="font-sans font-bold text-neutral-50 text-sm leading-5 tracking-tight">
                VaultCard
              </span>
            </div>
            <button className="rounded-full bg-neutral-800 border-white/10 border-1 border-solid flex px-3 py-1 items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#00ff88]" />
              <span className="font-bold text-neutral-50 text-xs leading-4">
                BTC/USDT
              </span>
              <ChevronDown className="size-3 text-[#a1a1a1]" />
            </button>
          </div>
          <nav className="flex items-center gap-1">
            <a className="font-sans rounded-sm text-[#a1a1a1] text-xs leading-4 flex px-3 py-1.5 items-center gap-1.5">
              <LayoutGrid className="size-3.5" />
              Markets
            </a>
            <a className="font-sans rounded-sm bg-neutral-800 text-neutral-50 text-xs leading-4 flex px-3 py-1.5 items-center gap-1.5">
              <TrendingUp className="size-3.5" />
              Trade
            </a>
            <a className="font-sans rounded-sm text-[#a1a1a1] text-xs leading-4 flex px-3 py-1.5 items-center gap-1.5">
              <Wallet className="size-3.5" />
              Portfolio
            </a>
            <a className="font-sans rounded-sm text-[#a1a1a1] text-xs leading-4 flex px-3 py-1.5 items-center gap-1.5">
              <Trophy className="size-3.5" />
              Leaderboard
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-neutral-800 border-white/10 border-1 border-solid flex px-3 py-1 items-center gap-1.5">
              <Circle className="size-3 text-[#00ff88]" />
              <span className="text-[#00ff88] text-xs leading-4">
                50,000.00 VCRD
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#00ff88]" />
              <span className="font-sans text-[#a1a1a1] text-xs leading-4">
                Live
              </span>
            </div>
            <div className="size-7 rounded-full bg-neutral-800 flex justify-center items-center">
              <User className="size-4 text-[#a1a1a1]" />
            </div>
          </div>
        </div>
        <div className="flex h-208">
          <div className="w-[55%] border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex flex-col">
            <div className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-4 py-3 justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="font-sans font-semibold text-neutral-50 text-sm leading-5">
                  BTC/USDT
                </span>
                <span className="font-bold text-neutral-50 text-2xl leading-8">
                  43,251.80
                </span>
                <span className="font-bold rounded-sm bg-[#00ff88]/15 text-[#00ff88] text-xs leading-4 px-2 py-0.5">
                  +2.34%
                </span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="font-sans uppercase text-[#a1a1a1] text-[10px]">
                    24h High
                  </span>
                  <span className="text-neutral-50 text-xs leading-4">
                    43,890.20
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans uppercase text-[#a1a1a1] text-[10px]">
                    24h Low
                  </span>
                  <span className="text-neutral-50 text-xs leading-4">
                    42,110.50
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans uppercase text-[#a1a1a1] text-[10px]">
                    24h Volume
                  </span>
                  <span className="text-neutral-50 text-xs leading-4">
                    12,847 BTC
                  </span>
                </div>
              </div>
            </div>
            <div className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-4 py-2 items-center gap-5">
              <span className="text-[#a1a1a1] text-xs leading-4">1m</span>
              <span className="text-[#a1a1a1] text-xs leading-4">5m</span>
              <span className="text-[#a1a1a1] text-xs leading-4">15m</span>
              <span className="font-bold text-neutral-50 text-xs leading-4 border-[#00ff88] border-t-0 border-r-0 border-b-2 border-l-0 border-solid pb-1">
                1h
              </span>
              <span className="text-[#a1a1a1] text-xs leading-4">4h</span>
              <span className="text-[#a1a1a1] text-xs leading-4">1d</span>
            </div>
            <div className="relative bg-[#0d0d10] flex-1">
              <div className="flex absolute inset-0 py-4 flex-col justify-between">
                <div className="border-white border-t-1 border-r-0 border-b-0 border-l-0 border-solid" />
                <div className="border-white border-t-1 border-r-0 border-b-0 border-l-0 border-solid" />
                <div className="border-white border-t-1 border-r-0 border-b-0 border-l-0 border-solid" />
                <div className="border-white border-t-1 border-r-0 border-b-0 border-l-0 border-solid" />
                <div className="border-white border-t-1 border-r-0 border-b-0 border-l-0 border-solid" />
              </div>
              <div className="text-[#a1a1a1] text-[10px] flex absolute right-2 top-4 flex-col gap-10">
                <span>44,000</span>
                <span>43,500</span>
                <span>43,000</span>
                <span>42,500</span>
                <span>42,000</span>
              </div>
              <div className="flex absolute inset-0 px-6 pb-8 items-end gap-1.5">
                <div className="flex flex-col justify-end items-center flex-1">
                  <div className="bg-[#00ff88] w-px h-12" />
                  <div className="bg-[#00ff88] w-2 h-16" />
                  <div className="bg-[#00ff88] w-px h-8" />
                </div>
                <div className="flex pb-10 flex-col justify-end items-center flex-1">
                  <div className="bg-[#ff3b3b] w-px h-6" />
                  <div className="bg-[#ff3b3b] w-2 h-10" />
                  <div className="bg-[#ff3b3b] w-px h-14" />
                </div>
                <div className="flex pb-20 flex-col justify-end items-center flex-1">
                  <div className="bg-[#00ff88] w-px h-10" />
                  <div className="bg-[#00ff88] w-2 h-20" />
                  <div className="bg-[#00ff88] w-px h-6" />
                </div>
                <div className="flex pb-4 flex-col justify-end items-center flex-1">
                  <div className="bg-[#00ff88] w-px h-8" />
                  <div className="bg-[#00ff88] w-2 h-24" />
                  <div className="bg-[#00ff88] w-px h-10" />
                </div>
                <div className="flex pb-12 flex-col justify-end items-center flex-1">
                  <div className="bg-[#ff3b3b] w-px h-14" />
                  <div className="bg-[#ff3b3b] w-2 h-12" />
                  <div className="bg-[#ff3b3b] w-px h-10" />
                </div>
                <div className="flex pb-2 flex-col justify-end items-center flex-1">
                  <div className="bg-[#00ff88] w-px h-10" />
                  <div className="bg-[#00ff88] w-2 h-28" />
                  <div className="bg-[#00ff88] w-px h-6" />
                </div>
                <div className="flex pb-8 flex-col justify-end items-center flex-1">
                  <div className="bg-[#ff3b3b] w-px h-12" />
                  <div className="bg-[#ff3b3b] w-2 h-16" />
                  <div className="bg-[#ff3b3b] w-px h-10" />
                </div>
                <div className="flex pb-6 flex-col justify-end items-center flex-1">
                  <div className="bg-[#00ff88] w-px h-8" />
                  <div className="bg-[#00ff88] w-2 h-20" />
                  <div className="bg-[#00ff88] w-px h-8" />
                </div>
                <div className="flex flex-col justify-end items-center flex-1">
                  <div className="bg-[#00ff88] w-px h-16" />
                  <div className="bg-[#00ff88] w-2 h-24" />
                  <div className="bg-[#00ff88] w-px h-6" />
                </div>
                <div className="flex pb-14 flex-col justify-end items-center flex-1">
                  <div className="bg-[#ff3b3b] w-px h-10" />
                  <div className="bg-[#ff3b3b] w-2 h-10" />
                  <div className="bg-[#ff3b3b] w-px h-12" />
                </div>
                <div className="flex pb-4 flex-col justify-end items-center flex-1">
                  <div className="bg-[#00ff88] w-px h-8" />
                  <div className="bg-[#00ff88] w-2 h-18" />
                  <div className="bg-[#00ff88] w-px h-8" />
                </div>
                <div className="flex flex-col justify-end items-center flex-1">
                  <div className="bg-[#00ff88] w-px h-14" />
                  <div className="bg-[#00ff88] w-2 h-28" />
                  <div className="bg-[#00ff88] w-px h-6" />
                </div>
              </div>
            </div>
            <div className="relative h-[20%] bg-[#0d0d10] border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid">
              <div className="font-sans uppercase text-[#a1a1a1] text-[10px] absolute left-3 top-1.5">
                Volume
              </div>
              <div className="flex px-6 pb-5 items-end gap-1.5 h-full">
                <div className="bg-[#00ff88]/40 flex-1 h-8" />
                <div className="bg-[#ff3b3b]/40 flex-1 h-5" />
                <div className="bg-[#00ff88]/40 flex-1 h-10" />
                <div className="bg-[#00ff88]/40 flex-1 h-14" />
                <div className="bg-[#ff3b3b]/40 flex-1 h-6" />
                <div className="bg-[#00ff88]/40 flex-1 h-12" />
                <div className="bg-[#ff3b3b]/40 flex-1 h-9" />
                <div className="bg-[#00ff88]/40 flex-1 h-11" />
                <div className="bg-[#00ff88]/40 flex-1 h-16" />
                <div className="bg-[#ff3b3b]/40 flex-1 h-7" />
                <div className="bg-[#00ff88]/40 flex-1 h-8" />
                <div className="bg-[#00ff88]/40 flex-1 h-12" />
              </div>
              <div className="text-[#a1a1a1] text-[9px] flex absolute inset-x-6 bottom-1 justify-between">
                <span>09:00</span>
                <span>11:00</span>
                <span>13:00</span>
                <span>15:00</span>
                <span>17:00</span>
              </div>
            </div>
          </div>
          <div className="w-[15%] border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex flex-col">
            <div className="flex-1 overflow-hidden">
              <div className="font-sans uppercase text-[#a1a1a1] text-[10px] tracking-wide border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-3 py-2">
                Order Book
              </div>
              <div className="font-sans uppercase text-[#a1a1a1] text-[9px] flex px-3 py-1 justify-between items-center">
                <span>Price</span>
                <span>Size</span>
                <span>Total</span>
              </div>
              <div className="flex flex-col">
                <div className="relative text-[11px] flex px-3 justify-between items-center h-5.5">
                  <div className="w-[80%] bg-[#ff3b3b]/15 absolute right-0 inset-y-0" />
                  <span className="relative z-10 text-[#ff3b3b]">
                    43,258.40
                  </span>
                  <span className="relative z-10 text-neutral-50">0.842</span>
                  <span className="relative z-10 text-[#a1a1a1]">4.21</span>
                </div>
                <div className="relative text-[11px] flex px-3 justify-between items-center h-5.5">
                  <div className="w-[65%] bg-[#ff3b3b]/15 absolute right-0 inset-y-0" />
                  <span className="relative z-10 text-[#ff3b3b]">
                    43,256.10
                  </span>
                  <span className="relative z-10 text-neutral-50">0.514</span>
                  <span className="relative z-10 text-[#a1a1a1]">3.37</span>
                </div>
                <div className="relative text-[11px] flex px-3 justify-between items-center h-5.5">
                  <div className="w-[50%] bg-[#ff3b3b]/15 absolute right-0 inset-y-0" />
                  <span className="relative z-10 text-[#ff3b3b]">
                    43,254.90
                  </span>
                  <span className="relative z-10 text-neutral-50">0.328</span>
                  <span className="relative z-10 text-[#a1a1a1]">2.86</span>
                </div>
                <div className="relative text-[11px] flex px-3 justify-between items-center h-5.5">
                  <div className="w-[38%] bg-[#ff3b3b]/15 absolute right-0 inset-y-0" />
                  <span className="relative z-10 text-[#ff3b3b]">
                    43,253.20
                  </span>
                  <span className="relative z-10 text-neutral-50">0.221</span>
                  <span className="relative z-10 text-[#a1a1a1]">2.53</span>
                </div>
                <div className="relative text-[11px] flex px-3 justify-between items-center h-5.5">
                  <div className="w-[25%] bg-[#ff3b3b]/15 absolute right-0 inset-y-0" />
                  <span className="relative z-10 text-[#ff3b3b]">
                    43,252.60
                  </span>
                  <span className="relative z-10 text-neutral-50">0.142</span>
                  <span className="relative z-10 text-[#a1a1a1]">2.31</span>
                </div>
              </div>
              <div className="border-y bg-neutral-800/30 text-[#a1a1a1] text-[10px] border-white/10 border-0 border-solid flex py-1.5 justify-center items-center gap-2">
                <span>Spread</span>
                <span className="text-neutral-50">0.80</span>
                <span>(0.002%)</span>
              </div>
              <div className="flex flex-col">
                <div className="relative text-[11px] flex px-3 justify-between items-center h-5.5">
                  <div className="w-[28%] bg-[#00ff88]/15 absolute right-0 inset-y-0" />
                  <span className="relative z-10 text-[#00ff88]">
                    43,251.80
                  </span>
                  <span className="relative z-10 text-neutral-50">0.167</span>
                  <span className="relative z-10 text-[#a1a1a1]">2.40</span>
                </div>
                <div className="relative text-[11px] flex px-3 justify-between items-center h-5.5">
                  <div className="w-[42%] bg-[#00ff88]/15 absolute right-0 inset-y-0" />
                  <span className="relative z-10 text-[#00ff88]">
                    43,250.40
                  </span>
                  <span className="relative z-10 text-neutral-50">0.298</span>
                  <span className="relative z-10 text-[#a1a1a1]">2.70</span>
                </div>
                <div className="relative text-[11px] flex px-3 justify-between items-center h-5.5">
                  <div className="w-[56%] bg-[#00ff88]/15 absolute right-0 inset-y-0" />
                  <span className="relative z-10 text-[#00ff88]">
                    43,248.90
                  </span>
                  <span className="relative z-10 text-neutral-50">0.412</span>
                  <span className="relative z-10 text-[#a1a1a1]">3.11</span>
                </div>
                <div className="relative text-[11px] flex px-3 justify-between items-center h-5.5">
                  <div className="w-[70%] bg-[#00ff88]/15 absolute right-0 inset-y-0" />
                  <span className="relative z-10 text-[#00ff88]">
                    43,246.20
                  </span>
                  <span className="relative z-10 text-neutral-50">0.587</span>
                  <span className="relative z-10 text-[#a1a1a1]">3.70</span>
                </div>
                <div className="relative text-[11px] flex px-3 justify-between items-center h-5.5">
                  <div className="w-[85%] bg-[#00ff88]/15 absolute right-0 inset-y-0" />
                  <span className="relative z-10 text-[#00ff88]">
                    43,244.50
                  </span>
                  <span className="relative z-10 text-neutral-50">0.764</span>
                  <span className="relative z-10 text-[#a1a1a1]">4.46</span>
                </div>
              </div>
            </div>
            <div className="border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex flex-col h-50">
              <div className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-3 py-2 justify-between items-center">
                <span className="font-sans uppercase text-[#a1a1a1] text-[10px] tracking-wide">
                  Recent Trades
                </span>
                <Activity className="size-3 text-[#00ff88]" />
              </div>
              <div className="font-sans uppercase text-[#a1a1a1] text-[9px] flex px-3 py-1 justify-between items-center">
                <span>Time</span>
                <span>Price</span>
                <span>Size</span>
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="text-[10px] flex px-3 justify-between items-center h-5">
                  <span className="text-[#a1a1a1]">15:42:01</span>
                  <span className="text-[#00ff88]">43,251.80</span>
                  <span className="text-neutral-50">0.142</span>
                </div>
                <div className="text-[10px] flex px-3 justify-between items-center h-5">
                  <span className="text-[#a1a1a1]">15:41:58</span>
                  <span className="text-[#ff3b3b]">43,250.40</span>
                  <span className="text-neutral-50">0.087</span>
                </div>
                <div className="text-[10px] flex px-3 justify-between items-center h-5">
                  <span className="text-[#a1a1a1]">15:41:55</span>
                  <span className="text-[#00ff88]">43,251.20</span>
                  <span className="text-neutral-50">0.214</span>
                </div>
                <div className="text-[10px] flex px-3 justify-between items-center h-5">
                  <span className="text-[#a1a1a1]">15:41:51</span>
                  <span className="text-[#00ff88]">43,252.60</span>
                  <span className="text-neutral-50">0.056</span>
                </div>
                <div className="text-[10px] flex px-3 justify-between items-center h-5">
                  <span className="text-[#a1a1a1]">15:41:47</span>
                  <span className="text-[#ff3b3b]">43,248.90</span>
                  <span className="text-neutral-50">0.331</span>
                </div>
                <div className="text-[10px] flex px-3 justify-between items-center h-5">
                  <span className="text-[#a1a1a1]">15:41:43</span>
                  <span className="text-[#00ff88]">43,251.80</span>
                  <span className="text-neutral-50">0.198</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[15%] bg-[#111114] flex p-3 flex-col">
            <div className="flex gap-2">
              <button className="font-bold rounded-sm bg-[#00ff88] text-black text-sm leading-5 py-2 flex-1">
                Buy
              </button>
              <button className="font-bold rounded-sm text-[#ff3b3b] text-sm leading-5 border-[#ff3b3b]/60 border-1 border-solid py-2 flex-1">
                Sell
              </button>
            </div>
            <div className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex mt-4 items-center gap-4">
              <span className="border-transparent font-bold text-neutral-50 text-xs leading-4 border-black/1 border-t-0 border-r-0 border-b-2 border-l-0 border-solid pb-2">
                Limit
              </span>
              <span className="text-[#a1a1a1] text-xs leading-4 pb-2">
                Market
              </span>
              <span className="text-[#a1a1a1] text-xs leading-4 pb-2">
                Stop
              </span>
            </div>
            <div className="flex mt-4 flex-col gap-1">
              <span className="font-sans uppercase text-[#a1a1a1] text-[11px]">
                Price
              </span>
              <div className="rounded-sm bg-neutral-950 border-white/15 border-1 border-solid flex p-2 justify-between items-center">
                <span className="text-neutral-50 text-sm leading-5">
                  43,251.80
                </span>
                <span className="text-[#a1a1a1] text-xs leading-4">USDT</span>
              </div>
            </div>
            <div className="flex mt-3 flex-col gap-1">
              <span className="font-sans uppercase text-[#a1a1a1] text-[11px]">
                Quantity
              </span>
              <div className="rounded-sm bg-neutral-950 border-white/15 border-1 border-solid flex p-2 justify-between items-center">
                <span className="text-neutral-50 text-sm leading-5">
                  0.5000
                </span>
                <span className="text-[#a1a1a1] text-xs leading-4">BTC</span>
              </div>
            </div>
            <div className="flex mt-2 gap-1.5">
              <button className="rounded-sm text-[#a1a1a1] text-[10px] border-white/10 border-1 border-solid py-1 flex-1">
                25%
              </button>
              <button className="rounded-sm text-[#a1a1a1] text-[10px] border-white/10 border-1 border-solid py-1 flex-1">
                50%
              </button>
              <button className="rounded-sm text-[#a1a1a1] text-[10px] border-white/10 border-1 border-solid py-1 flex-1">
                75%
              </button>
              <button className="rounded-sm text-[#a1a1a1] text-[10px] border-white/10 border-1 border-solid py-1 flex-1">
                100%
              </button>
            </div>
            <div className="flex mt-3 flex-col gap-1">
              <span className="font-sans uppercase text-[#a1a1a1] text-[11px]">
                Total
              </span>
              <div className="rounded-sm bg-neutral-800/40 border-white/10 border-1 border-solid flex p-2 justify-between items-center">
                <span className="text-[#a1a1a1] text-sm leading-5">
                  21,625.90
                </span>
                <span className="text-[#a1a1a1] text-xs leading-4">USDT</span>
              </div>
            </div>
            <div className="flex mt-3 flex-col gap-1">
              <span className="font-sans uppercase text-[#a1a1a1] text-[11px]">
                TIF
              </span>
              <div className="rounded-sm bg-neutral-950 border-white/15 border-1 border-solid flex p-2 justify-between items-center">
                <span className="text-neutral-50 text-xs leading-4">GTC</span>
                <ChevronDown className="size-3 text-[#a1a1a1]" />
              </div>
            </div>
            <button className="font-bold rounded-sm bg-[#00ff88] text-black text-sm leading-5 mt-4 w-full h-10">
              Buy BTC
            </button>
            <span className="font-sans text-[#a1a1a1] text-[11px] mt-2">
              Available: 50,000.00 USDT
            </span>
          </div>
        </div>
        <div className="bg-[#0d0d10] border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid h-50">
          <div className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-4 items-center gap-6">
            <span className="font-sans font-bold text-neutral-50 text-xs leading-4 border-[#00ff88] border-t-0 border-r-0 border-b-2 border-l-0 border-solid py-2.5">
              Open Orders
            </span>
            <span className="font-sans text-[#a1a1a1] text-xs leading-4 py-2.5">
              Order History
            </span>
            <span className="font-sans text-[#a1a1a1] text-xs leading-4 py-2.5">
              Position
            </span>
          </div>
          <table className="text-left text-[11px] w-full">
            <thead>
              <tr className="font-sans uppercase text-[#a1a1a1] text-[10px]">
                <th className="font-medium px-4 py-2">Time</th>
                <th className="font-medium px-4 py-2">Market</th>
                <th className="font-medium px-4 py-2">Type</th>
                <th className="font-medium px-4 py-2">Side</th>
                <th className="font-medium px-4 py-2">Price</th>
                <th className="font-medium px-4 py-2">Qty</th>
                <th className="font-medium px-4 py-2">Filled</th>
                <th className="font-medium px-4 py-2">Status</th>
                <th className="font-medium px-4 py-2">Cancel</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid">
                <td className="text-[#a1a1a1] px-4 py-1.5">15:38:22</td>
                <td className="text-neutral-50 px-4 py-1.5">BTC/USDT</td>
                <td className="text-[#a1a1a1] px-4 py-1.5">Limit</td>
                <td className="px-4 py-1.5">
                  <span className="rounded-sm bg-[#00ff88]/15 text-[#00ff88] px-2 py-0.5">
                    Buy
                  </span>
                </td>
                <td className="text-neutral-50 px-4 py-1.5">43,100.00</td>
                <td className="text-neutral-50 px-4 py-1.5">0.500</td>
                <td className="text-[#a1a1a1] px-4 py-1.5">0%</td>
                <td className="px-4 py-1.5">
                  <span className="rounded-sm bg-yellow-400/15 text-yellow-400 px-2 py-0.5">
                    Open
                  </span>
                </td>
                <td className="px-4 py-1.5">
                  <button className="text-[#ff3b3b]">
                    <X className="size-3.5" />
                  </button>
                </td>
              </tr>
              <tr className="border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid">
                <td className="text-[#a1a1a1] px-4 py-1.5">15:31:09</td>
                <td className="text-neutral-50 px-4 py-1.5">BTC/USDT</td>
                <td className="text-[#a1a1a1] px-4 py-1.5">Limit</td>
                <td className="px-4 py-1.5">
                  <span className="rounded-sm bg-[#ff3b3b]/15 text-[#ff3b3b] px-2 py-0.5">
                    Sell
                  </span>
                </td>
                <td className="text-neutral-50 px-4 py-1.5">43,800.00</td>
                <td className="text-neutral-50 px-4 py-1.5">0.250</td>
                <td className="text-[#a1a1a1] px-4 py-1.5">0%</td>
                <td className="px-4 py-1.5">
                  <span className="rounded-sm bg-yellow-400/15 text-yellow-400 px-2 py-0.5">
                    Open
                  </span>
                </td>
                <td className="px-4 py-1.5">
                  <button className="text-[#ff3b3b]">
                    <X className="size-3.5" />
                  </button>
                </td>
              </tr>
              <tr className="border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid">
                <td className="text-[#a1a1a1] px-4 py-1.5">15:24:51</td>
                <td className="text-neutral-50 px-4 py-1.5">BTC/USDT</td>
                <td className="text-[#a1a1a1] px-4 py-1.5">Stop</td>
                <td className="px-4 py-1.5">
                  <span className="rounded-sm bg-[#00ff88]/15 text-[#00ff88] px-2 py-0.5">
                    Buy
                  </span>
                </td>
                <td className="text-neutral-50 px-4 py-1.5">42,500.00</td>
                <td className="text-neutral-50 px-4 py-1.5">1.000</td>
                <td className="text-[#a1a1a1] px-4 py-1.5">35%</td>
                <td className="px-4 py-1.5">
                  <span className="rounded-sm bg-yellow-400/15 text-yellow-400 px-2 py-0.5">
                    Open
                  </span>
                </td>
                <td className="px-4 py-1.5">
                  <button className="text-[#ff3b3b]">
                    <X className="size-3.5" />
                  </button>
                </td>
              </tr>
              <tr className="border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid">
                <td className="text-[#a1a1a1] px-4 py-1.5">15:18:33</td>
                <td className="text-neutral-50 px-4 py-1.5">BTC/USDT</td>
                <td className="text-[#a1a1a1] px-4 py-1.5">Limit</td>
                <td className="px-4 py-1.5">
                  <span className="rounded-sm bg-[#ff3b3b]/15 text-[#ff3b3b] px-2 py-0.5">
                    Sell
                  </span>
                </td>
                <td className="text-neutral-50 px-4 py-1.5">44,200.00</td>
                <td className="text-neutral-50 px-4 py-1.5">0.750</td>
                <td className="text-[#a1a1a1] px-4 py-1.5">12%</td>
                <td className="px-4 py-1.5">
                  <span className="rounded-sm bg-yellow-400/15 text-yellow-400 px-2 py-0.5">
                    Open
                  </span>
                </td>
                <td className="px-4 py-1.5">
                  <button className="text-[#ff3b3b]">
                    <X className="size-3.5" />
                  </button>
                </td>
              </tr>
              <tr className="border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid">
                <td className="text-[#a1a1a1] px-4 py-1.5">15:09:14</td>
                <td className="text-neutral-50 px-4 py-1.5">BTC/USDT</td>
                <td className="text-[#a1a1a1] px-4 py-1.5">Limit</td>
                <td className="px-4 py-1.5">
                  <span className="rounded-sm bg-[#00ff88]/15 text-[#00ff88] px-2 py-0.5">
                    Buy
                  </span>
                </td>
                <td className="text-neutral-50 px-4 py-1.5">42,950.00</td>
                <td className="text-neutral-50 px-4 py-1.5">0.320</td>
                <td className="text-[#a1a1a1] px-4 py-1.5">0%</td>
                <td className="px-4 py-1.5">
                  <span className="rounded-sm bg-yellow-400/15 text-yellow-400 px-2 py-0.5">
                    Open
                  </span>
                </td>
                <td className="px-4 py-1.5">
                  <button className="text-[#ff3b3b]">
                    <X className="size-3.5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
