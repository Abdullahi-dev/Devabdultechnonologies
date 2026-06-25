import { motion } from "motion/react";
import { 
  LayoutDashboard, Activity, Maximize, Users, Calendar, 
  CreditCard, Cpu, FileText, LogOut, Wallet, Smartphone, 
  Bell, User, UserPlus, Shield, Building2 
} from "lucide-react";

export function EhmconnectMockup() {
  return (
    <div className="w-full h-full bg-[#f4f7f9] border border-slate-200 rounded-2xl overflow-hidden relative flex font-sans text-slate-800">
      {/* Sidebar */}
      <div className="w-16 md:w-56 bg-[#0f1f38] flex flex-col h-full shrink-0 z-20">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-4 gap-3 mb-4">
          <div className="w-8 h-8 bg-[#3b82f6] rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            EHM
          </div>
          <span className="text-[#facc15] font-bold tracking-wide hidden md:block text-sm">EHMCONNECT</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#2563eb] text-white cursor-pointer">
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 cursor-pointer transition-colors">
            <Activity className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Diagnostic Queue</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 cursor-pointer transition-colors">
            <Maximize className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">AR Diagnostics</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 cursor-pointer transition-colors">
            <Users className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Patients</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 cursor-pointer transition-colors">
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Appointments</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 cursor-pointer transition-colors">
            <CreditCard className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Billing & Finance</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 cursor-pointer transition-colors">
            <Activity className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Equipment IoT</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 cursor-pointer transition-colors">
            <FileText className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Reports</span>
          </div>
        </nav>

        {/* Bottom Action */}
        <div className="p-4 mt-auto">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-white/5 cursor-pointer transition-colors bg-[#162a4a]">
            <LogOut className="w-4 h-4 shrink-0" />
            <span className="hidden md:block text-xs font-medium">Sign Out</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc]">
        {/* Top Header */}
        <div className="h-16 bg-white flex items-center justify-end px-6 gap-4 border-b border-slate-100 shrink-0 shadow-sm z-10">
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-xs font-bold text-[#0f1f38] hover:bg-slate-100 transition-colors">
            <Wallet className="w-4 h-4 text-blue-600" /> ₦25,000
          </button>
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors">
            <Smartphone className="w-4 h-4" /> Install App
          </button>
          <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white cursor-pointer">
            <User className="w-4 h-4" />
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto scrollbar-hide">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-8">
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-[#0f1f38] mb-1">Admin Console</h1>
              <p className="text-[10px] sm:text-xs text-slate-500">Monitoring <span className="font-semibold text-[#0f1f38]">Lagos Teaching Hospital</span></p>
            </div>
            <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md border border-slate-200 bg-white text-[8px] sm:text-[10px] font-bold text-slate-500 tracking-wider flex items-center gap-2 shadow-sm w-fit">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div> FACILITY STATUS: NOMINAL
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-2 sm:mb-4">
            {/* Card 1 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-3 sm:p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[7px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">3 Active</span>
              </div>
              <div className="mt-auto">
                <div className="text-xl sm:text-3xl font-bold text-[#0f1f38] mb-1">3</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Total Staff</div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-3 sm:p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[7px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">+12% This Week</span>
              </div>
              <div className="mt-auto">
                <div className="text-xl sm:text-3xl font-bold text-[#0f1f38] mb-1">128</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Total Visits</div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-3 sm:p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[7px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Available Funds</span>
              </div>
              <div className="mt-auto">
                <div className="text-xl sm:text-3xl font-bold text-[#0f1f38] mb-1 tracking-tight">₦25k</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Wallet Balance</div>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-3 sm:p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[7px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">All Systems Go</span>
              </div>
              <div className="mt-auto">
                <div className="text-xl sm:text-3xl font-bold text-[#0f1f38] mb-1">99.9%</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium">System Health</div>
              </div>
            </motion.div>
          </div>

          {/* Second Row Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 pb-4">
            {/* Card 5 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white p-3 sm:p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[7px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Waiting For Doctor</span>
              </div>
              <div className="mt-auto">
                <div className="text-xl sm:text-3xl font-bold text-[#0f1f38] mb-1">1</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium">New Registrations</div>
              </div>
            </motion.div>

            {/* Card 6 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white p-3 sm:p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[7px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Total Daily Intake</span>
              </div>
              <div className="mt-auto">
                <div className="text-xl sm:text-3xl font-bold text-[#0f1f38] mb-1">4</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Today's Visits</div>
              </div>
            </motion.div>

            {/* Card 7 */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white p-3 sm:p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col hidden sm:flex">
              <div className="flex justify-between items-start mb-2 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[7px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Ward Occupancy</span>
              </div>
              <div className="mt-auto">
                <div className="text-xl sm:text-3xl font-bold text-[#0f1f38] mb-1">0</div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-medium">Active Admissions</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
