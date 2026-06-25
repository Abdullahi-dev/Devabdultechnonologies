import { motion } from "motion/react";
import { Shield, Folder, RefreshCw, Smartphone, Activity, FileText, Users, Settings, LogOut, Search, Bell, Wifi, Lock, ShieldCheck, ArrowUpRight } from "lucide-react";

export function SentinelShieldMockup() {
  return (
    <div className="w-full h-full bg-[#0b1121] text-slate-300 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-16 md:w-48 lg:w-56 bg-[#0f172a] border-r border-slate-800 flex flex-col shrink-0 z-20">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 gap-3 border-b border-slate-800/50 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-bold text-white tracking-wide hidden md:block text-sm">SentinelShield <span className="text-blue-400 text-xs">AI</span></span>
        </div>

        {/* Nav */}
        <div className="flex-1 py-4 space-y-1 px-3 overflow-y-auto scrollbar-hide">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600/20 text-blue-400 cursor-pointer">
            <Activity className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Overview</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <Folder className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Cases</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <RefreshCw className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Recovery</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <Smartphone className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Devices</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <Activity className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Threat Intel</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <FileText className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Evidence</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <Users className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Team</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <Settings className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Settings</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-800/50 shrink-0 flex flex-col gap-4">
          <div className="hidden md:block">
            <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">System Status</div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[20%] rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Sign Out</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-[#0b1121]">
          <div className="flex-1 max-w-md">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search incidents, devices, or logs..." 
                className="w-full bg-[#0f172a] border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
                readOnly
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <div className="relative cursor-pointer">
              <Bell className="w-4 h-4 text-slate-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-[#0b1121]"></span>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-medium text-slate-300">Guest</span>
                <span className="text-[10px] text-slate-500">User</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                G
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 sm:gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Security Overview</h1>
              <p className="text-sm text-slate-400">Real-time monitoring and threat analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 text-xs font-medium hover:bg-slate-800 transition-colors">
                Download Report
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20">
                <ShieldCheck className="w-4 h-4" /> Run Security Scan
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 shrink-0">
            {/* Card 1 */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-red-400">
                  <Folder className="w-4 h-4" />
                </div>
                <span className="px-2 py-1 rounded-md bg-slate-800 text-slate-400 text-[10px] font-medium">0 total</span>
              </div>
              <div className="mt-auto">
                <div className="text-3xl font-bold text-white mb-1">0</div>
                <div className="text-xs text-slate-400">Active Cases</div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-medium flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> 0 registered
                </span>
              </div>
              <div className="mt-auto">
                <div className="text-3xl font-bold text-white mb-1">0</div>
                <div className="text-xs text-slate-400">Protected Devices</div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-500">
                  <Wifi className="w-4 h-4" />
                </div>
                <span className="px-2 py-1 rounded-md bg-slate-800 text-slate-400 text-[10px] font-medium">-5%</span>
              </div>
              <div className="mt-auto">
                <div className="text-3xl font-bold text-white mb-1">1.2 GB</div>
                <div className="text-xs text-slate-400">Network Traffic</div>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-medium flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> +1.5%
                </span>
              </div>
              <div className="mt-auto">
                <div className="text-3xl font-bold text-white mb-1">94%</div>
                <div className="text-xs text-slate-400">Security Score</div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4 min-h-0 pb-2">
            {/* Threat Activity Chart */}
            <div className="xl:col-span-2 bg-[#0f172a] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col relative overflow-hidden">
              <h3 className="text-sm font-bold text-white mb-1">Threat Activity</h3>
              <p className="text-xs text-slate-400 mb-4 sm:mb-6">7-day monitoring of network intrusion attempts</p>
              
              <div className="flex-1 relative w-full flex items-end">
                {/* Y-Axis */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-500 pb-4">
                  <span>24</span>
                  <span>18</span>
                  <span>12</span>
                  <span>6</span>
                  <span>0</span>
                </div>
                
                {/* Grid Lines */}
                <div className="absolute inset-0 ml-8 flex flex-col justify-between pb-4">
                  <div className="w-full border-t border-slate-800 border-dashed"></div>
                  <div className="w-full border-t border-slate-800 border-dashed"></div>
                  <div className="w-full border-t border-slate-800 border-dashed"></div>
                  <div className="w-full border-t border-slate-800 border-dashed"></div>
                  <div className="w-full border-t border-slate-800 border-dashed"></div>
                </div>

                {/* Chart Line & Fill */}
                <div className="absolute inset-0 ml-8 mb-4">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      d="M0,90 Q15,85 25,95 T45,50 T65,95 T85,80 T100,90" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="2" 
                      vectorEffect="non-scaling-stroke"
                    />
                    <motion.path 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      d="M0,90 Q15,85 25,95 T45,50 T65,95 T85,80 T100,90 L100,100 L0,100 Z" 
                      fill="url(#threatGradient)" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Recent Cases */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col overflow-hidden">
              <h3 className="text-sm font-bold text-white mb-1">Recent Cases</h3>
              <p className="text-xs text-slate-400 mb-4 sm:mb-6">Latest security investigations</p>
              
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
                  <Folder className="w-5 h-5 text-slate-500" />
                </div>
                <div className="text-sm font-medium text-slate-300">No cases yet</div>
                <div className="text-xs text-slate-500 mt-1">New security cases will appear here</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
