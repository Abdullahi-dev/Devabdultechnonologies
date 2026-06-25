import { motion } from "motion/react";
import { Code2, Film, TrendingUp, BarChart3, Building, Palette, Copy, Cpu, Terminal, Send, Bot, User, Zap, Activity } from "lucide-react";

export function DoerAgentsMockup() {
  const agents = [
    { name: "Software Dev", icon: <Code2 className="w-4 h-4" />, active: true },
    { name: "AI Film Studio", icon: <Film className="w-4 h-4" />, active: false },
    { name: "Forex Trading", icon: <TrendingUp className="w-4 h-4" />, active: false },
    { name: "Data Analysis", icon: <BarChart3 className="w-4 h-4" />, active: false },
    { name: "Architecture", icon: <Building className="w-4 h-4" />, active: false },
    { name: "Graphic Design", icon: <Palette className="w-4 h-4" />, active: false },
    { name: "Double Work AI", icon: <Copy className="w-4 h-4" />, active: false },
  ];

  return (
    <div className="w-full h-full bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden relative flex font-sans text-slate-300">
      {/* Sidebar */}
      <div className="w-48 lg:w-56 bg-[#0f1115] border-r border-white/5 flex flex-col shrink-0 z-20">
        <div className="h-14 flex items-center px-4 gap-3 border-b border-white/5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-sm tracking-wide">DOERAGENTS</span>
        </div>
        
        <div className="p-3 flex-1 overflow-y-auto scrollbar-hide">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Specialized Agents</div>
          <div className="space-y-1">
            {agents.map((agent, i) => (
              <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${agent.active ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}>
                {agent.icon}
                <span className="text-xs font-medium">{agent.name}</span>
                {agent.active && (
                  <motion.div 
                    animate={{ opacity: [1, 0.4, 1] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_5px_#6366f1]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-white/5 shrink-0">
          <div className="bg-black/50 rounded-lg p-3 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-slate-400 font-medium">Local Engine</span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><Zap className="w-3 h-3" /> Ollama</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] font-medium">
                <span className="text-slate-500">RAM Usage</span>
                <span className="text-slate-300">14.2 / 32 GB</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[45%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#09090b] relative">
        {/* Topbar */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-[#0f1115]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shrink-0">
              <Code2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                Software Developer
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300 border border-slate-700 font-mono">codellama:13b</span>
              </div>
              <div className="text-[10px] text-indigo-400 flex items-center gap-1 font-medium">
                <Activity className="w-3 h-3" /> Generating response... 45.2 t/s
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:bg-white/10 items-center gap-2 transition-colors">
              <Terminal className="w-3 h-3" /> View Logs
            </button>
          </div>
        </div>

        {/* Chat/Action Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-6">
          {/* User Message */}
          <div className="flex gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
              <User className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex-1 pt-1">
              <div className="text-xs font-bold text-slate-300 mb-1">You</div>
              <div className="text-sm text-slate-300 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 leading-relaxed">
                Create a modern React component for a trading dashboard stats card. It should use Tailwind CSS and include a subtle glow effect.
              </div>
            </div>
          </div>

          {/* Agent Message */}
          <div className="flex gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
              <Bot className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex-1 pt-1 overflow-hidden">
              <div className="text-xs font-bold text-indigo-400 mb-1 flex items-center gap-2">
                Software Developer
                <span className="text-[9px] text-slate-500 font-normal bg-white/5 px-1.5 py-0.5 rounded">Local Inference</span>
              </div>
              <div className="text-sm text-slate-300 mb-4 leading-relaxed">
                I'll build a modern, responsive trading stats card using React, Tailwind CSS, and Lucide icons. I'll add a subtle animated glow effect using Tailwind's arbitrary values.
              </div>
              
              {/* Code Block */}
              <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-lg">
                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                  <span className="text-[10px] font-mono text-slate-400">TradingCard.tsx</span>
                  <span className="text-[10px] text-slate-500 font-medium">React</span>
                </div>
                <div className="p-4 font-mono text-[11px] sm:text-xs text-slate-300 overflow-x-auto relative">
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="overflow-hidden"
                  >
                    <pre className="text-emerald-400">import <span className="text-pink-400">&#123;</span> TrendingUp <span className="text-pink-400">&#125;</span> from <span className="text-amber-300">'lucide-react'</span>;</pre>
                    <pre className="mt-2"><span className="text-purple-400">export function</span> <span className="text-blue-400">TradingCard</span>() <span className="text-pink-400">&#123;</span></pre>
                    <pre className="ml-4"><span className="text-purple-400">return</span> (</pre>
                    <pre className="ml-8 text-slate-400">&lt;<span className="text-blue-400">div</span> <span className="text-indigo-300">className</span>=<span className="text-amber-300">"relative group rounded-2xl bg-slate-900 p-6 border border-slate-800"</span>&gt;</pre>
                    <pre className="ml-12 text-slate-400">&lt;<span className="text-blue-400">div</span> <span className="text-indigo-300">className</span>=<span className="text-amber-300">"absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"</span> /&gt;</pre>
                    <pre className="ml-12 text-slate-400">&lt;<span className="text-blue-400">div</span> <span className="text-indigo-300">className</span>=<span className="text-amber-300">"relative z-10"</span>&gt;</pre>
                    <pre className="ml-16 text-slate-400">&lt;<span className="text-blue-400">h3</span> <span className="text-indigo-300">className</span>=<span className="text-amber-300">"text-slate-400 text-sm font-medium"</span>&gt;BTC/USD&lt;/<span className="text-blue-400">h3</span>&gt;</pre>
                    <pre className="ml-16 text-slate-400">&lt;<span className="text-blue-400">div</span> <span className="text-indigo-300">className</span>=<span className="text-amber-300">"text-2xl font-bold text-white mt-1"</span>&gt;$64,230.00&lt;/<span className="text-blue-400">div</span>&gt;</pre>
                    <pre className="ml-16 text-slate-400">&lt;<span className="text-blue-400">div</span> <span className="text-indigo-300">className</span>=<span className="text-amber-300">"flex items-center gap-1 text-emerald-400 text-xs mt-2"</span>&gt;</pre>
                    <pre className="ml-20 text-slate-400">&lt;<span className="text-blue-400">TrendingUp</span> <span className="text-indigo-300">className</span>=<span className="text-amber-300">"w-3 h-3"</span> /&gt; +2.4%</pre>
                    <pre className="ml-16 text-slate-400">&lt;/<span className="text-blue-400">div</span>&gt;</pre>
                    <pre className="ml-12 text-slate-400">&lt;/<span className="text-blue-400">div</span>&gt;</pre>
                    <pre className="ml-8 text-slate-400">&lt;/<span className="text-blue-400">div</span>&gt;</pre>
                    <pre className="ml-4">);</pre>
                    <pre><span className="text-pink-400">&#125;</span></pre>
                  </motion.div>
                  <motion.div 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-2 h-3.5 bg-indigo-400 inline-block align-middle ml-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-[#0f1115]/80 backdrop-blur-md shrink-0 z-10">
          <div className="max-w-3xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Ask Software Developer to build, debug, or explain code..." 
              className="w-full bg-[#09090b] border border-white/10 rounded-xl pl-4 pr-12 py-3 sm:py-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors shadow-inner"
              readOnly
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20">
              <Send className="w-4 h-4 sm:w-4 sm:h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
