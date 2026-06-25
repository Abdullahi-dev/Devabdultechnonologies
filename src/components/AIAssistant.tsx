import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2, Sparkles, Bot, Home, MessageCircle, ChevronRight } from "lucide-react";
import { GoogleGenAI, Chat } from "@google/genai";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0"/>
    <path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_87_7264)"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="white"/>
    <path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5BD066"/>
        <stop offset="1" stopColor="#27B43E"/>
      </linearGradient>
    </defs>
  </svg>
);

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"home" | "chat">("home");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the Devabdultechnologies AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (view === "chat") {
      scrollToBottom();
    }
  }, [messages, view]);

  const handleQuickAction = (action: string) => {
    if (action === "whatsapp") {
      window.open("https://wa.me/2348026275433", "_blank");
      return;
    }
    
    setView("chat");
    setInput(action);
    // Use a timeout to allow state to update before sending
    setTimeout(() => {
      const form = document.getElementById("ai-chat-form") as HTMLFormElement;
      if (form) form.requestSubmit();
    }, 100);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      if (!chatRef.current) {
        chatRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: "You are a helpful customer support AI agent for Devabdultechnologies. Devabdultechnologies is a premier custom software development company engineering the future of enterprise digital infrastructure. You are an expert on all our services: Custom Software Development, AI & Machine Learning, Mobile Applications, Web Development, Cloud & DevOps, and Fintech Systems. You also know about our successful case studies like DOERAGENTS, SentinelShield AI, SmartBookr, Capitalbot, Smartbulk, Ehmconnect, Trustalink, and Eminent Mines Resources. Answer any complex questions about Devabdultechnologies, our services, and our expertise. If a user needs human intervention, technical support, or wants to start a project, strongly recommend they contact our human team via WhatsApp at +234 802 627 5433 or by clicking the WhatsApp button. Be concise, professional, and friendly. Use plain text formatting with simple spacing.",
          },
        });
      }

      const streamResponse = await chatRef.current.sendMessageStream({ message: userMessage });
      
      setIsLoading(false);
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      for await (const chunk of streamResponse) {
        const c = chunk as any;
        if (c.text) {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              content: newMessages[lastIndex].content + c.text
            };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setIsLoading(false);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I'm having trouble connecting right now. Please try again later or contact us directly." 
      }]);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 bg-accent-blue text-bg-dark rounded-full shadow-[0_0_30px_rgba(77,163,255,0.3)] flex items-center justify-center hover:bg-[#3b8ee6] hover:scale-110 transition-all duration-300 group ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        >
          <Sparkles className="w-7 h-7 absolute opacity-0 group-hover:opacity-100 group-hover:animate-ping text-white" />
          <Bot className="w-7 h-7 relative z-10" />
        </button>

        <a
          href="https://wa.me/2348026275433"
          target="_blank"
          rel="noreferrer"
          className={`w-16 h-16 bg-white rounded-full shadow-[0_0_30px_rgba(0,0,0,0.1)] flex items-center justify-center hover:scale-110 transition-all duration-300 group ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        >
          <WhatsAppIcon className="w-10 h-10" />
        </a>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 w-[380px] h-[600px] max-h-[80vh] bg-bg-card border border-white/10 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-blue to-[#3b8ee6] p-6 border-b border-white/10 relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-bg-dark mb-1 flex items-center gap-2">
                    Hi there <span className="text-2xl">👋</span>
                  </h2>
                  <p className="text-bg-dark/80 font-medium text-lg">How can we help?</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-bg-dark/60 hover:text-bg-dark hover:bg-black/10 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden flex flex-col bg-bg-dark/50 relative">
              {view === "home" ? (
                <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {/* Recent Message Card */}
                  {messages.length > 1 && (
                    <div 
                      onClick={() => setView("chat")}
                      className="bg-bg-card border border-white/10 rounded-2xl p-4 mb-6 cursor-pointer hover:border-accent-blue/50 transition-colors shadow-lg"
                    >
                      <p className="text-white/50 text-xs mb-3 font-medium uppercase tracking-wider">Recent message</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent-blue/20 rounded-full flex items-center justify-center border border-accent-blue/30 shrink-0">
                          <Bot className="w-5 h-5 text-accent-blue" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-white text-sm font-medium truncate">Devabdultechnologies AI</p>
                          <p className="text-white/60 text-xs truncate">
                            {messages[messages.length - 1]?.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="bg-bg-card border border-white/10 rounded-2xl overflow-hidden shadow-lg">
                    <button 
                      onClick={() => handleQuickAction("I'd like to explore your services.")}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors border-b border-white/5 group"
                    >
                      <span className="text-white/90 text-sm font-medium">Explore Services</span>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-accent-blue transition-colors" />
                    </button>
                    <button 
                      onClick={() => handleQuickAction("I want to start a new project.")}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors border-b border-white/5 group"
                    >
                      <span className="text-white/90 text-sm font-medium">Start a Project</span>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-accent-blue transition-colors" />
                    </button>
                    <button 
                      onClick={() => handleQuickAction("I need technical support.")}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors border-b border-white/5 group"
                    >
                      <span className="text-white/90 text-sm font-medium">Technical Support</span>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-accent-blue transition-colors" />
                    </button>
                    <button 
                      onClick={() => handleQuickAction("whatsapp")}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-white/90 text-sm font-medium flex items-center gap-2">
                        <WhatsAppIcon className="w-4 h-4" />
                        Talk to a Human
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#25D366] transition-colors" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {messages.map((msg, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        key={idx} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                              ? 'bg-accent-blue text-bg-dark rounded-tr-sm font-medium' 
                              : 'bg-bg-card border border-white/10 text-white/90 rounded-tl-sm'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-bg-card border border-white/10 rounded-2xl rounded-tl-sm p-4 text-white/90 flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-accent-blue" />
                          <span className="text-xs text-white/50">typing...</span>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <form id="ai-chat-form" onSubmit={handleSend} className="p-4 border-t border-white/10 bg-bg-card shrink-0">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        disabled={isLoading}
                        className="w-full bg-bg-dark border border-white/10 rounded-full pl-5 pr-14 py-4 text-white text-sm focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all disabled:opacity-50 placeholder:text-white/30"
                      />
                      <button 
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 w-10 h-10 bg-accent-blue text-bg-dark rounded-full flex items-center justify-center hover:bg-[#3b8ee6] transition-colors disabled:opacity-50 disabled:hover:bg-accent-blue shadow-md"
                      >
                        <Send className="w-4 h-4 ml-0.5" />
                      </button>
                    </div>
                    <div className="text-center mt-3">
                      <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Powered by Devabdultechnologies</span>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="bg-bg-card border-t border-white/10 p-2 flex justify-around shrink-0">
              <button 
                onClick={() => setView("home")}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors flex-1 ${view === "home" ? "text-accent-blue" : "text-white/50 hover:text-white/80"}`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[10px] font-medium">Home</span>
              </button>
              <button 
                onClick={() => setView("chat")}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors flex-1 ${view === "chat" ? "text-accent-blue" : "text-white/50 hover:text-white/80"}`}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-[10px] font-medium">Messages</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
