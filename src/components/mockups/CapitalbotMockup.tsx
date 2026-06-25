import { motion } from "motion/react";
import { 
  Zap, LayoutDashboard, TerminalSquare, Cpu, ShieldAlert, Radio, 
  History, LogOut, Settings, Bell, Download, Wallet, X, User, 
  Activity, Layers, Volume2, Search, Plus, BarChart2, ChevronRight, Maximize, MousePointer2,
  TrendingUp, Pencil, Type, Smile, Ruler, ZoomIn
} from "lucide-react";

export function CapitalbotMockup() {
  return (
    <div className="w-full h-full bg-[#11131a] text-slate-300 font-sans flex overflow-hidden text-sm">
      {/* Sidebar */}
      <div className="w-14 sm:w-60 bg-[#11131a] border-r border-[#1e222d] flex flex-col shrink-0 z-10 hidden sm:flex">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-[#1e222d] shrink-0">
          <div className="w-8 h-8 rounded shrink-0 bg-blue-600 flex items-center justify-center text-white">
            <Layers className="w-5 h-5" fill="currentColor" />
          </div>
          <span className="font-bold text-white tracking-widest text-lg">CAPITALBOT</span>
        </div>

        {/* Nav */}
        <div className="flex-1 py-6 space-y-2 overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            <span className="font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <Zap className="w-5 h-5 shrink-0" />
            <span className="font-medium">Auto-Trade</span>
          </div>
          <div className="flex items-center justify-between px-6 py-2.5 text-blue-400 bg-[#181d28] border-l-4 border-blue-500 cursor-pointer">
            <div className="flex items-center gap-3">
              <TerminalSquare className="w-5 h-5 shrink-0" />
              <span className="font-medium">Market Terminal</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <Cpu className="w-5 h-5 shrink-0" />
            <span className="font-medium">Strategy Engine</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span className="font-medium">Risk Manager</span>
          </div>
          <div className="flex items-center gap-3 px-6 py-2.5 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <Bell className="w-5 h-5 shrink-0" />
            <span className="font-medium">Signal Center</span>
          </div>
        </div>

        {/* User & Bottom */}
        <div className="p-4 space-y-4 shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#181d28] border border-[#2a2f3e]">
            <img src="https://i.pravatar.cc/150?u=mahmud" alt="User" className="w-9 h-9 rounded-full object-cover shrink-0" />
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-white truncate leading-tight">Mahmud Abdullahi</div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">aalqutijifawy@gmail.com</div>
            </div>
          </div>
          <div className="px-2 space-y-2">
            <div className="flex items-center gap-3 py-2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer uppercase text-xs font-bold tracking-widest uppercase">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Admin Panel</span>
            </div>
            <div className="flex items-center gap-3 py-2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer uppercase text-xs font-bold tracking-widest">
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Log Out</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#11131a] relative overflow-hidden">
        {/* Topbar */}
        <div className="h-16 border-b border-[#1e222d] flex items-center justify-between px-4 shrink-0 bg-[#0b0e14]">
          <div className="flex items-center gap-4">
            <X className="w-5 h-5 text-slate-500 cursor-pointer hover:text-white" />
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-slate-500">MT5</span>
              <span className="px-2 py-1 rounded border border-[#00e676]/30 text-[#00e676] text-xs font-bold tracking-wider flex items-center gap-1.5 uppercase bg-[#00e676]/10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00e676]"></div> CONNECTED
              </span>
            </div>
            <button className="px-4 py-1.5 rounded-full border border-red-500/50 text-red-500 text-xs font-bold uppercase tracking-wider bg-red-500/10 hover:bg-red-500/20 transition-colors text-center leading-tight">
              KILL SWITCH<br/><span className="text-[9px]">(CTRL+SHIFT+K)</span>
            </button>
          </div>

          <div className="hidden lg:flex bg-[#1e222d] rounded-full p-1 border border-[#2a2f3e] text-xs font-bold">
            <button className="px-4 py-1 rounded-full text-slate-400 hover:text-white">OFF</button>
            <button className="px-4 py-1 rounded-full text-slate-400 hover:text-white">AUTO</button>
            <button className="px-4 py-1 rounded-full text-slate-400 hover:text-white">HYBRID</button>
            <button className="px-4 py-1 rounded-full bg-[#facc15] text-black">SIGNAL</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center gap-2 bg-[#181d28] border border-[#2a2f3e] rounded-lg px-4 py-2">
              <Wallet className="w-4 h-4 text-[#00e676]" />
              <div className="flex gap-2 items-center">
                <span className="text-xs text-slate-500 font-bold tracking-widest uppercase">BALANCE</span>
                <span className="text-sm text-[#00e676] font-bold">$0</span>
              </div>
            </div>

            <Volume2 className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white hidden sm:block" />
            <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white hidden sm:block" />
            
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2a2f3e] hover:bg-[#363c4e] text-white text-xs font-bold uppercase tracking-wider transition-colors">
              <Download className="w-4 h-4" /> INSTALL APP
            </button>
          </div>
        </div>

        {/* Warning Bar */}
        <div className="bg-[#181d28] py-1 px-4 border-b border-[#1e222d] text-[#facc15] text-xs flex items-center gap-2">
          <span className="font-bold">⚠️ Must match chart for AI!</span>
        </div>

        {/* Market Terminal Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#0b0e14]">
          {/* Chart Area */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-[#1e222d] bg-[#11131a] relative isolate">
            {/* Chart Toolbar */}
            <div className="h-12 border-b border-[#1e222d] flex items-center px-4 justify-between shrink-0">
               <div className="flex items-center gap-4 text-sm">
                 <div className="flex items-center gap-1 font-semibold text-white">
                    <Search className="w-4 h-4 text-slate-400" /> BOOM300
                 </div>
                 <Plus className="w-4 h-4 text-slate-400 cursor-pointer" />
                 <span className="text-slate-300">24h</span>
                 <BarChart2 className="w-4 h-4 text-slate-400" />
                 <span className="text-slate-400 font-serif italic text-lg leading-none cursor-pointer">fx</span>
               </div>
               <div className="flex items-center gap-4">
                 <div className="text-blue-500 flex flex-col items-center leading-tight cursor-pointer">
                   <span className="text-xs font-medium">Save</span>
                   <span className="text-[9px] border-b border-blue-500">Save</span>
                 </div>
                 <Settings className="w-4 h-4 text-slate-400 cursor-pointer" />
                 <Maximize className="w-4 h-4 text-slate-400 cursor-pointer" />
               </div>
            </div>

            <div className="flex-1 flex relative h-full">
              {/* Left Tools Column */}
              <div className="w-12 border-r border-[#1e222d] flex flex-col items-center py-2 space-y-4 shrink-0 bg-[#0b0e14]">
                 <div className="p-1.5 rounded border border-slate-600 bg-slate-800"><MousePointer2 className="w-4 h-4 text-white" /></div>
                 <TrendingUp className="w-4 h-4 text-slate-400" />
                 <BarChart2 className="w-4 h-4 text-slate-400" />
                 <Pencil className="w-4 h-4 text-slate-400" />
                 <Type className="w-4 h-4 text-slate-400" />
                 <Smile className="w-4 h-4 text-slate-400" />
                 <Ruler className="w-4 h-4 text-slate-400" />
                 <ZoomIn className="w-4 h-4 text-slate-400" />
              </div>

              {/* Chart Content Mockup */}
              <div className="flex-1 relative overflow-hidden flex self-stretch items-stretch min-h-[300px]">
                {/* Chart Grid */}
                <div className="absolute inset-0 right-16 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-5">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className="border-r border-b border-white"></div>
                  ))}
                </div>

                {/* Y-Axis */}
                <div className="absolute right-0 top-0 bottom-0 w-20 border-l border-[#1e222d] bg-[#0b0e14] flex flex-col justify-around text-xs text-slate-500 z-10 font-mono py-8 pointer-events-none">
                  <div className="pl-2">2,400.0000</div>
                  <div className="pl-2">2,200.0000</div>
                  <div className="pl-2">2,000.0000</div>
                  <div className="bg-[#00e676] text-black pl-2 py-0.5 font-bold relative -ml-[100px] w-[180px] text-right pr-2">
                    BOOM300N 1,794.3110
                  </div>
                  <div className="pl-2">1,600.0000</div>
                  <div className="pl-2">1,400.0000</div>
                  <div className="pl-2">1,200.0000</div>
                </div>

                {/* Data Header */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
                  <div className="flex gap-2 items-center text-sm">
                    <span className="font-bold text-slate-300">Boom 300 Index</span>
                    <span className="text-slate-400">· 24h ·</span>
                    <div className="w-2 h-2 rounded-full border border-[#00e676]/50 ml-2"></div>
                  </div>
                  <div className="text-xs font-mono">
                    <span className="text-slate-500">O</span><span className="text-[#00e676]">1,729.1170</span>{' '}
                    <span className="text-slate-500">H</span><span className="text-[#00e676]">1,794.5930</span>{' '}
                    <span className="text-slate-500">L</span><span className="text-[#00e676]">1,703.2540</span>{' '}
                    <span className="text-slate-500">C</span><span className="text-[#00e676]">1,794.3110</span>{' '}
                    <span className="text-[#00e676]">+65.1590 (+3.77%)</span>
                  </div>
                </div>

                {/* Candles Mockup */}
                <div className="absolute inset-x-8 inset-y-16 right-24 pointer-events-none">
                    <svg width="100%" height="100%" preserveAspectRatio="none" className="overflow-visible stroke-2">
                        {/* A rough series of candles */}
                        {/* Red  */}
                        <g stroke="#ff4b4b" fill="#ff4b4b" transform="translate(10, 0)">
                            <line x1="10" y1="20" x2="10" y2="100" />
                            <rect x="5" y="30" width="10" height="50" />
                        </g>
                        <g stroke="#ff4b4b" fill="#ff4b4b" transform="translate(30, 40)">
                            <line x1="10" y1="10" x2="10" y2="120" />
                            <rect x="5" y="40" width="10" height="60" />
                        </g>
                         {/* Green */}
                        <g stroke="#00e676" fill="#0b0e14" transform="translate(50, 60)">
                            <line x1="10" y1="30" x2="10" y2="150" />
                            <rect x="5" y="40" width="10" height="40" />
                        </g>
                        {/* Adding more randomly generated looking candles spanning across */}
                        {Array.from({length: 40}).map((_, i) => {
                            const isGreen = Math.random() > 0.5;
                            const color = isGreen ? '#00e676' : '#ff4b4b';
                            const fill = isGreen ? '#0b0e14' : '#ff4b4b';
                            const xOffset = 80 + i * 18;
                            const yOffset = 80 + Math.sin(i * 0.3) * 60 + (i * 4); // General downward then upward trend
                            
                            return (
                                <g key={i} stroke={color} fill={fill} transform={`translate(${xOffset}, ${yOffset})`}>
                                    <line x1="10" y1="-20" x2="10" y2="40" />
                                    <rect x="5" y="-10" width="10" height="30" />
                                </g>
                            );
                        })}
                    </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Market Intelligence */}
          <div className="w-full lg:w-[320px] bg-[#11131a] flex flex-col shrink-0 overflow-y-auto border-t lg:border-t-0 border-[#1e222d]">
             <div className="p-4 flex items-center justify-between border-b border-[#1e222d]">
                <div className="text-slate-400 font-bold tracking-widest text-xs lg:w-32 uppercase leading-tight">
                    Market Intelligence
                </div>
                <button className="px-4 py-2 bg-blue-900/40 text-blue-400 border border-blue-500/30 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-blue-800/40 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Execute AI Analysis
                </button>
             </div>

             <div className="p-4 space-y-4">
                {/* Market State Panel */}
                <div className="bg-[#181d28] border border-[#2a2f3e] rounded-xl p-5 shadow-lg">
                    <h3 className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-4">Market State</h3>
                    
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#00e676] shadow-[0_0_8px_#00e676]"></div>
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">Trending</div>
                                <div className="text-[#00e676] font-bold flex items-center gap-1 text-sm">
                                    <span className="text-lg leading-none">▲</span> BULLISH
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                           <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">Bias</div>
                           <div className="bg-[#00e676]/10 text-[#00e676] border border-[#00e676]/30 px-3 py-1 rounded font-bold text-xs uppercase text-center min-w-[60px]">
                               Buy
                           </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase mb-2">
                                <span className="text-slate-400">Confirmation</span>
                                <span className="text-slate-400">0.72%</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#11131a] rounded overflow-hidden">
                                <div className="h-full bg-[#00e676] w-[5%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase mb-2">
                                <span className="text-slate-400">Confidence</span>
                                <span className="text-slate-400">65%</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#11131a] rounded overflow-hidden">
                                <div className="h-full bg-[#00e676] w-[65%]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Indicator Matrix */}
                <div className="bg-[#181d28] border border-[#2a2f3e] rounded-xl p-5 shadow-lg">
                    <h3 className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-4">Indicator Matrix</h3>
                    
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs pb-3 border-b border-[#2a2f3e]/50">
                            <span className="text-slate-400 font-bold uppercase w-12">EMA</span>
                            <span className="text-slate-300 font-mono">1788.2658</span>
                            <div className="flex items-center gap-1.5 text-[#00e676] font-bold min-w-[80px] justify-end">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00e676]"></div> BULLISH
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs pb-3 border-b border-[#2a2f3e]/50">
                            <span className="text-slate-400 font-bold uppercase w-12">SMA</span>
                            <span className="text-slate-300 font-mono">1785.9307</span>
                            <div className="flex items-center gap-1.5 text-[#00e676] font-bold min-w-[80px] justify-end">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00e676]"></div> BULLISH
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs pb-1">
                            <span className="text-slate-400 font-bold uppercase w-12">MACD</span>
                            <span className="text-slate-300 font-mono">3.1607</span>
                            <div className="flex items-center gap-1.5 text-[#00e676] font-bold min-w-[80px] justify-end">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00e676]"></div> BULLISH
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
