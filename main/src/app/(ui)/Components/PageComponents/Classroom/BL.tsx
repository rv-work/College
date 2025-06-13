import React, { useEffect, useState } from 'react';
import BLUser from './BLUser';
import { useSocket } from '@/app/Context/Socket';
import { motion } from 'framer-motion';

interface BLProps {
  roomId: string;
  isHost: boolean;
}

const BL: React.FC<BLProps> = ({ roomId, isHost }) => {
  const { users } = useSocket();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
  
    setFilteredUsers(
      users.filter(user => {
        const userName = user?.userName?.toLowerCase();
        return userName?.includes(normalizedSearchTerm);
      })
    );
  }, [users, searchTerm]);
  

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl p-6 shadow-lg border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Participants 
          <span className="ml-2 text-sm bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
            {users.length}
          </span>
        </h3>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search participants..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`bg-gray-800 text-gray-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700/80 transition-all duration-300 ${isSearchFocused ? 'w-64' : 'w-48'}`}
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {users.length > 0 ? (
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl shadow-inner h-96 overflow-hidden border border-gray-700/50">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full overflow-y-auto pr-2 custom-scrollbar"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <motion.div 
                  key={user.socketId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <BLUser user={user} roomId={roomId} isHost={isHost} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center h-full">
                <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-700/70 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-400">No results found for &quot;{searchTerm}&quot;</p>

                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-3 px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600/40 text-blue-300 text-sm rounded-lg transition-all duration-300"
                  >
                    Clear search
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center h-72 text-center p-6 border border-gray-700/50">
          <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium">No participants yet</p>
          <p className="text-gray-500 text-sm mt-2">Share your room code to invite others</p>
          <button className="mt-6 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg transition-all duration-300 flex items-center shadow-lg">
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Invite Participants
          </button>
        </div>
      )}

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

export default BL;