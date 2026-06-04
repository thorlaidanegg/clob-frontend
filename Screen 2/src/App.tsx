import { useEffect } from "react";
import { BookOpen, Eye, Hexagon, Trophy, Workflow, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div>
      <div className="bg-neutral-950 text-neutral-50 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="relative bg-[#0a0a0b] w-full h-270 overflow-hidden">
          <div className="absolute inset-0" />
          <div className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[900px] blur-2xl rounded-full bg-[#00ff88]/12 absolute" />
          <nav className="relative z-10 border-white/6 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-12 justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-sm bg-[#00ff88]/15 flex justify-center items-center">
                <Hexagon className="size-4 text-[#00ff88]" />
              </div>
              <span className="font-semibold text-neutral-50 text-sm leading-5 tracking-tight">
                PaperX
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                className="text-[#a1a1a1] text-xs leading-4 px-3 gap-2 h-8"
              >
                <Zap className="size-4" />
                Markets
              </Button>
              <Button
                variant="ghost"
                className="text-[#a1a1a1] text-xs leading-4 px-3 gap-2 h-8"
              >
                <Workflow className="size-4" />
                Trade
              </Button>
              <Button
                variant="ghost"
                className="text-[#a1a1a1] text-xs leading-4 px-3 gap-2 h-8"
              >
                <BookOpen className="size-4" />
                Portfolio
              </Button>
              <Button
                variant="ghost"
                className="text-[#a1a1a1] text-xs leading-4 px-3 gap-2 h-8"
              >
                <Trophy className="size-4" />
                Leaderboard
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="size-2 shadow-[0_0_8px_#00ff88] rounded-full bg-[#00ff88]" />
                <span className="font-medium text-[#00ff88] text-[11px]">
                  Live
                </span>
              </div>
              <Button
                variant="ghost"
                className="text-[#a1a1a1] text-xs leading-4 px-3 h-8"
              >
                Log in
              </Button>
              <Button className="font-bold rounded-sm bg-[#00ff88] text-black text-xs leading-4 px-4 h-8">
                Start trading free
              </Button>
            </div>
          </nav>
          <div className="relative z-10 flex pt-20 justify-center items-center">
            <div className="rounded-lg bg-[#111114] border-white/8 border-1 border-solid p-10 w-100">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-sm bg-[#00ff88]/15 flex justify-center items-center">
                    <Hexagon className="size-5 text-[#00ff88]" />
                  </div>
                  <span className="font-semibold text-neutral-50 text-lg leading-7 tracking-tight">
                    PaperX
                  </span>
                </div>
                <p className="text-[#a1a1a1] text-[13px]">
                  Virtual credits. Real mechanics.
                </p>
              </div>
              <div className="border-white/8 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex mt-8">
                <button className="font-medium text-neutral-50 text-sm leading-5 border-[#00ff88] border-t-0 border-r-0 border-b-2 border-l-0 border-solid -mb-px pb-3 flex-1">
                  Log in
                </button>
                <button className="font-medium text-[#a1a1a1] text-sm leading-5 pb-3 flex-1">
                  Sign up
                </button>
              </div>
              <div className="flex mt-8 flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="uppercase text-[#a1a1a1] text-[11px] tracking-wider">
                    Email
                  </label>
                  <div className="rounded-sm bg-[#0a0a0b] border-white/10 border-1 border-solid flex px-3 items-center h-10">
                    <input
                      className="bg-transparent outline-none font-mono text-neutral-50 text-sm leading-5 w-full"
                      placeholder="trader@mail.com"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="uppercase text-[#a1a1a1] text-[11px] tracking-wider">
                    Password
                  </label>
                  <div className="rounded-sm bg-[#0a0a0b] border-white/10 border-1 border-solid flex px-3 items-center gap-2 h-10">
                    <input
                      type="password"
                      className="bg-transparent outline-none font-mono text-neutral-50 text-sm leading-5 w-full"
                      placeholder="••••••••"
                    />
                    <Eye className="size-4 shrink-0 text-[#a1a1a1]" />
                  </div>
                  <a className="text-[#00ff88]/80 text-xs leading-4 self-end">
                    Forgot password?
                  </a>
                </div>
              </div>
              <Button className="font-bold rounded-sm bg-[#00ff88] text-black text-sm leading-5 mt-6 w-full h-10">
                Log in
              </Button>
              <p className="text-center text-[#a1a1a1] text-xs leading-4 mt-6">
                Don't have an account?
                <span className="text-[#00ff88]">Sign up →</span>
              </p>
              <p className="text-center text-[#a1a1a1]/70 text-[11px] mt-8">
                No deposit required · No KYC · Paper trading only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
