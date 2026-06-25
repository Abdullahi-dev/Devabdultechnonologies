import { motion } from "motion/react";
import { Calendar, Users, CreditCard, MessageSquare, CheckCircle2, Clock, Bell, Settings, Plus } from "lucide-react";

export function SmartBookrMockup() {
  return (
    <div className="w-full h-full bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden relative flex font-sans text-slate-300">
      {/* Sidebar */}
      <div className="w-16 md:w-48 bg-slate-900 border-r border-slate-800 flex flex-col items-center md:items-start py-6 shrink-0">
        <div className="flex items-center gap-2 px-0 md:px-6 mb-10 text-white font-bold">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="hidden md:block tracking-tight">SmartBookr</span>
        </div>

        <nav className="flex flex-col gap-4 w-full px-2 md:px-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-400 cursor-pointer">
            <Calendar className="w-5 h-5 shrink-0" />
            <span className="hidden md:block text-sm font-medium">Schedule</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
            <Users className="w-5 h-5 shrink-0" />
            <span className="hidden md:block text-sm font-medium">Clients</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
            <CreditCard className="w-5 h-5 shrink-0" />
            <span className="hidden md:block text-sm font-medium">Payments</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
            <MessageSquare className="w-5 h-5 shrink-0" />
            <span className="hidden md:block text-sm font-medium">Reminders</span>
          </div>
        </nav>

        <div className="mt-auto w-full px-2 md:px-4">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
            <Settings className="w-5 h-5 shrink-0" />
            <span className="hidden md:block text-sm font-medium">Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {/* Topbar */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
          <h2 className="text-white font-semibold">Today's Appointments</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Booking</span>
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-medium mb-1">Revenue (Today)</div>
              <div className="text-2xl font-bold text-white">$1,240.00</div>
              <div className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> via Stripe & Paystack
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-medium mb-1">Appointments</div>
              <div className="text-2xl font-bold text-white">14</div>
              <div className="text-blue-400 text-xs mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> 4 upcoming
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-medium mb-1">Reminders Sent</div>
              <div className="text-2xl font-bold text-white">28</div>
              <div className="text-green-400 text-xs mt-1 flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> SMS & WhatsApp
              </div>
            </div>
          </div>

          {/* Schedule Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="text-white font-medium mb-4">Upcoming Schedule</h3>
            
            <div className="space-y-4">
              {/* Appointment 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-16 text-right text-sm text-slate-400 pt-1">09:00 AM</div>
                <div className="flex-1 bg-blue-600/10 border border-blue-500/20 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                  <div>
                    <div className="text-white font-medium text-sm">Consultation - Sarah Jenkins</div>
                    <div className="text-blue-400 text-xs mt-0.5">Service: Premium Package</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">Paid</span>
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-[10px] font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-400" /> KYC Verified
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Appointment 2 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="w-16 text-right text-sm text-slate-400 pt-1">10:30 AM</div>
                <div className="flex-1 bg-purple-600/10 border border-purple-500/20 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                  <div>
                    <div className="text-white font-medium text-sm">Strategy Session - TechFlow Inc</div>
                    <div className="text-purple-400 text-xs mt-0.5">Staff: Michael R.</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase">Pending</span>
                  </div>
                </div>
              </motion.div>

              {/* Appointment 3 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-16 text-right text-sm text-slate-400 pt-1">01:00 PM</div>
                <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative overflow-hidden opacity-60">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-500"></div>
                  <div>
                    <div className="text-white font-medium text-sm">Follow-up - David Chen</div>
                    <div className="text-slate-400 text-xs mt-0.5">Service: Standard Review</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-slate-700 text-slate-300 text-[10px] font-bold uppercase flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> WhatsApp Sent
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
