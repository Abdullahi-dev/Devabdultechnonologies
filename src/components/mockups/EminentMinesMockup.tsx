import { motion } from "motion/react";
import { Map, Pickaxe, Truck, ShieldCheck, BarChart3, Layers, Settings, Bell, Search, Menu, ChevronDown, Activity, MapPin } from "lucide-react";

export function EminentMinesMockup() {
  return (
    <div className="w-full h-full bg-[#f8f9fa] border border-slate-200 rounded-2xl overflow-hidden relative flex font-sans text-slate-800">
      {/* Sidebar */}
      <div className="w-16 md:w-56 bg-[#1e293b] flex flex-col h-full shrink-0 z-20 shadow-xl">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-4 gap-3 border-b border-slate-700/50 shrink-0">
          <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/20">
            <Pickaxe className="w-5 h-5" />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-white font-bold tracking-wide text-sm leading-tight">EMINENT MINES</span>
            <span className="text-amber-500 text-[9px] font-bold tracking-widest uppercase">Resources Ltd</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-1 px-3 overflow-y-auto scrollbar-hide">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-amber-500/10 text-amber-500 cursor-pointer border border-amber-500/20">
            <Map className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Operations Map</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <Layers className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Geological Data</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <Truck className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Logistics & Fleet</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Resource Tracking</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Compliance & Safety</span>
          </div>
        </nav>

        {/* Bottom Action */}
        <div className="p-4 mt-auto border-t border-slate-700/50 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 cursor-pointer transition-colors">
            <Settings className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">System Config</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f1f5f9] relative">
        {/* Top Header */}
        <div className="h-16 bg-white flex items-center justify-between px-4 sm:px-6 border-b border-slate-200 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <Menu className="w-5 h-5 text-slate-500 md:hidden" />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200">
              <Search className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400">Search sites, assets, reports...</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700">
              <ShieldCheck className="w-4 h-4" /> 100% Compliant
            </div>
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full border border-white"></span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer pl-2 sm:border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold">
                JD
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 sm:gap-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Operations Command Center</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Monitoring 6 active sites across Nigeria</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
                Generate Report
              </button>
              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow-sm shadow-amber-500/20 transition-colors">
                Dispatch Fleet
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 shrink-0">
            {/* Card 1 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Pickaxe className="w-12 h-12" />
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Daily Extraction</div>
              <div className="text-2xl font-bold text-slate-800">1,245 <span className="text-sm text-slate-500 font-medium">tons</span></div>
              <div className="text-[10px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                <Activity className="w-3 h-3" /> +5.2% vs yesterday
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Truck className="w-12 h-12" />
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Active Fleet</div>
              <div className="text-2xl font-bold text-slate-800">42 <span className="text-sm text-slate-500 font-medium">/ 50</span></div>
              <div className="text-[10px] font-bold text-amber-600 mt-2 flex items-center gap-1">
                <Activity className="w-3 h-3" /> 8 units in maintenance
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Safety Incidents</div>
              <div className="text-2xl font-bold text-slate-800">0</div>
              <div className="text-[10px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 142 days incident-free
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <MapPin className="w-12 h-12" />
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Active Sites</div>
              <div className="text-2xl font-bold text-slate-800">6</div>
              <div className="text-[10px] font-bold text-blue-600 mt-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Across 6 states
              </div>
            </div>
          </div>

          {/* Map & Activity Section */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
            {/* Map Area */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-4 flex flex-col shadow-sm h-full">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <h3 className="text-sm font-bold text-slate-800">Live Site Map</h3>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Active</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Surveying</span>
                </div>
              </div>
              
              {/* Mock Map Container */}
              <div className="flex-1 bg-slate-100 rounded-lg border border-slate-200 relative overflow-hidden min-h-[200px]">
                {/* Abstract Map Background */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                {/* Map Points */}
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                  className="absolute top-[30%] left-[40%] flex flex-col items-center"
                >
                  <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md relative z-10">
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-50"></div>
                  </div>
                  <div className="bg-white px-2 py-1 rounded shadow-sm border border-slate-200 text-[9px] font-bold text-slate-700 mt-1 whitespace-nowrap">
                    Site Alpha (Kogi)
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }}
                  className="absolute top-[60%] left-[25%] flex flex-col items-center"
                >
                  <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md relative z-10"></div>
                  <div className="bg-white px-2 py-1 rounded shadow-sm border border-slate-200 text-[9px] font-bold text-slate-700 mt-1 whitespace-nowrap">
                    Site Beta (Osun)
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: "spring" }}
                  className="absolute top-[20%] left-[70%] flex flex-col items-center"
                >
                  <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-md relative z-10"></div>
                  <div className="bg-white px-2 py-1 rounded shadow-sm border border-slate-200 text-[9px] font-bold text-slate-700 mt-1 whitespace-nowrap">
                    Survey Delta (Nasarawa)
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col shadow-sm h-full overflow-hidden">
              <h3 className="text-sm font-bold text-slate-800 mb-4 shrink-0">Recent Activity</h3>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                    <Truck className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Fleet Dispatch</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">3 trucks dispatched from Site Alpha to Processing Plant.</div>
                    <div className="text-[9px] font-bold text-slate-400 mt-1">10 MINS AGO</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Safety Inspection</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Routine safety check completed at Site Beta. All clear.</div>
                    <div className="text-[9px] font-bold text-slate-400 mt-1">1 HOUR AGO</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                    <Layers className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Geological Report</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">New core sample data uploaded for Survey Delta.</div>
                    <div className="text-[9px] font-bold text-slate-400 mt-1">3 HOURS AGO</div>
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
