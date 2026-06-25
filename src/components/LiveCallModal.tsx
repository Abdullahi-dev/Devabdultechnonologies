import { motion, AnimatePresence } from "motion/react";
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface LiveCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LiveCallModal({ isOpen, onClose }: LiveCallModalProps) {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsConnecting(true);
      setCallDuration(0);
      
      const timer = setTimeout(() => {
        setIsConnecting(false);
      }, 3000); // Simulate connection time
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isConnecting && isOpen) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnecting, isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-8 flex flex-col items-center justify-center min-h-[300px] relative">
              {/* Background pulse effect when connecting */}
              {isConnecting && (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-32 h-32 bg-accent-orange/20 rounded-full absolute"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1.5], opacity: [0.8, 0.4, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    className="w-32 h-32 bg-accent-orange/30 rounded-full absolute"
                  />
                </div>
              )}

              <div className="w-24 h-24 rounded-full bg-bg-dark border-2 border-white/10 flex items-center justify-center mb-6 relative z-10 overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/agent/200/200" 
                  alt="Agent" 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">
                {isConnecting ? 'Connecting...' : 'Support Agent'}
              </h3>
              
              <p className="text-white/60 font-medium relative z-10 flex items-center gap-2">
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Finding available agent
                  </>
                ) : (
                  <span className="text-accent-orange font-mono text-lg">
                    {formatTime(callDuration)}
                  </span>
                )}
              </p>
            </div>

            <div className="bg-bg-dark p-6 flex justify-center gap-6 border-t border-white/5">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-white/20 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              <button 
                onClick={onClose}
                className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-lg shadow-red-500/20"
              >
                <PhoneOff className="w-7 h-7" />
              </button>
              
              <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isVideoOff ? 'bg-white/20 text-white' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
              >
                {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
