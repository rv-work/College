import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "@/app/Context/Socket";
import { motion, AnimatePresence } from "framer-motion";

type ChatMessage = {
  user: string;
  message: string;
  socketId: string;
  timestamp: string;
};

interface BRProps {
  roomId: string;
}

const BR: React.FC<BRProps> = ({ roomId }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { socket } = useSocket();

  useEffect(() => {
    const storedMessages = localStorage.getItem(`chat_${roomId}`);
    if (storedMessages) {
      setChatMessages(JSON.parse(storedMessages));
    }
  }, [roomId]);

  useEffect(() => {
    if (socket) {
      socket.on("loadMessages", (messages: ChatMessage[]) => {
        setChatMessages(messages);
        localStorage.setItem(`chat_${roomId}`, JSON.stringify(messages));
      });

      socket.on("chatMessage", (messageData: ChatMessage) => {
        setChatMessages((prev) => {
          const updatedMessages = [...prev, messageData];
          localStorage.setItem(`chat_${roomId}`, JSON.stringify(updatedMessages));
          return updatedMessages;
        });
      });
    }

    return () => {
      socket?.off("loadMessages");
      socket?.off("chatMessage");
    };
  }, [socket, roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      socket.emit("chatMessage", {
        roomId,
        message: newMessage,
      });

      setNewMessage("");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl p-6 shadow-lg border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Live Chat
          <span className="ml-2 text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
            {chatMessages.length}
          </span>
        </h3>

        <div className="flex items-center">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
          <span className="text-sm text-gray-400">Live</span>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl shadow-inner h-96 overflow-hidden border border-gray-700/50">
        <motion.div 
          className="h-80 overflow-y-auto pr-2 custom-scrollbar"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {chatMessages.length > 0 ? (
            <AnimatePresence>
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`flex mb-4 mt-6 ${
                    msg.socketId === socket?.id ? "justify-end" : "justify-start"
                  }`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div
                    className={`max-w-xs rounded-xl shadow-md ${
                      msg.socketId === socket?.id
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                        : "bg-gray-800 border border-gray-700 text-gray-200"
                    }`}
                  >
                    <div className="p-3">
                      <div className="flex items-center mb-1">
                        <span className={`text-xs font-medium ${
                          msg.socketId === socket?.id ? "text-blue-200" : "text-blue-400"
                        }`}>
                          {msg.socketId === socket?.id ? "You" : msg.user}
                        </span>
                        <span className="ml-2 text-xs opacity-60">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">No messages yet</p>
              <p className="text-gray-500 text-sm mt-2">Start the conversation!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </motion.div>

        <div className="mt-4 flex items-center bg-gray-800 rounded-lg border border-gray-700/50 shadow-inner p-1">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`flex-grow bg-transparent text-gray-200 px-4 py-2 rounded-lg focus:outline-none transition-all duration-300 ${isFocused ? 'placeholder-gray-400' : 'placeholder-gray-600'}`}
            placeholder="Type a message..."
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`ml-2 px-4 py-2 rounded-lg flex items-center justify-center transition-all duration-300 ${
              newMessage.trim() 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-md' 
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="mr-1">Send</span>
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(56, 189, 248, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(56, 189, 248, 0.7);
        }
      `}</style>
    </div>
  );
};

export default BR;