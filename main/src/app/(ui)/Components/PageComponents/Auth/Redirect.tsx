import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import {  X, User, Calendar, Code, BookOpen, Zap, UserPlus, Gift, Heart } from "lucide-react";
import { useAuth } from '@/app/Context/AuthContext';
import { useRouter } from "nextjs-toploader/app";

const Redirect = ({showDestinationModal , setShowDestinationModal} : {showDestinationModal : boolean , setShowDestinationModal : (showDestinationModal : boolean) => void}) => {

   const router = useRouter();
   const { setGoto } = useAuth();

   
    const handleDestinationSelect = (destination: string) => {
      setGoto(destination);
      setShowDestinationModal(false);
      router.push(`/${destination}`);
    };
  
    const destinations = [
      { id: "profile", name: "My Profile", icon: <User className="w-6 h-6" /> },
      { id: "events", name: "Events", icon: <Gift className="w-6 h-6" /> },
  
      { id: "dsa", name: "DSA/Code", icon: <Code className="w-6 h-6" /> },
      { id: "source", name: "Source", icon: <BookOpen className="w-6 h-6" /> },
      { id: "profile/my-events", name: "My Events", icon: <Calendar className="w-6 h-6" /> },
  
      { id: "youtube", name: "Youtube Hub", icon: <Zap className="w-6 h-6" /> },
      { id: "events/host", name: "Host an Event", icon: <UserPlus className="w-6 h-6" /> },
      { id: "sources/contribute", name: "Contribute", icon: <Heart className="w-6 h-6" /> },
    ];




  return (
    <div>
      <AnimatePresence>
        {showDestinationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              className="absolute inset-0 bg-blue-900/10 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-full w-full">
                  <div className="absolute top-1/4 left-0 right-0 h-4 bg-blue-500/10 rounded-full blur-xl transform animate-pulse"></div>
                  <div className="absolute top-1/3 left-0 right-0 h-4 bg-indigo-500/10 rounded-full blur-xl transform animate-pulse" style={{ animationDelay: "1s" }}></div>
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-purple-500/10 rounded-full blur-xl transform animate-pulse" style={{ animationDelay: "2s" }}></div>
                  <div className="absolute top-2/3 left-0 right-0 h-4 bg-cyan-500/10 rounded-full blur-xl transform animate-pulse" style={{ animationDelay: "1.5s" }}></div>
                  <div className="absolute top-3/4 left-0 right-0 h-4 bg-blue-500/10 rounded-full blur-xl transform animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                </div>
              </div>
            </motion.div>

            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-6 left-10 top-6 relative z-10"
            >
              <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome to 100xCode!</h2>
              <p className="text-lg text-blue-200 max-w-md mx-auto">Choose your destination to continue your  journey</p>
            </motion.div>

            {/* Circular Navigation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative h-screen w-screen overflow-y-auto">
                {destinations.map((dest, index) => {
                  const angle = (index / destinations.length) * Math.PI * 2; 
                  const radius = 150; // Circle radius
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <motion.button
                      key={dest.id}
                      initial={{ opacity: 0, x, y }}
                      animate={{ 
                        opacity: 1, 
                        x, 
                        y,
                        transition: { delay: 0.3 + index * 0.1 }
                      }}
                      exit={{ opacity: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDestinationSelect(dest.id)}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-3xl p-4 border border-white/20 shadow-lg pointer-events-auto transition-all duration-300"
                      style={{ marginLeft: x, marginTop: y }}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className="text-white">
                          {dest.icon}
                        </div>
                        <span className="text-white text-sm font-medium whitespace-nowrap">{dest.name}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                setShowDestinationModal(false);
                router.push("/");
              }}
              className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all z-20 pointer-events-auto"
            >
              <X className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Redirect
