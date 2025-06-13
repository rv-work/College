"use client";

import React, { useState, useEffect } from "react";
import { useSocket } from "@/app/Context/Socket";
import { motion } from "framer-motion";
import Image from "next/image";

interface UserProps {
  user: {
    socketId: string;
    userName: string;
    canEdit: boolean;
    host: boolean;
    profilePicture?: string; // Optional profile picture URL
  };
  roomId: string;
  isHost: boolean;
}

const BLUser: React.FC<UserProps> = ({ user, roomId, isHost }) => {
  const [isEditing, setIsEditing] = useState(user.canEdit);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { socket } = useSocket();

  useEffect(() => {
    setIsEditing(user.canEdit);
  }, [user.canEdit]);

  const handleToggleEdit = () => {
    if (isHost) {
      const newPermission = !isEditing;
      setIsEditing(newPermission);
      socket?.emit("toggleEdit", { roomId, targetId: user.socketId, canEdit: newPermission });
      console.log(newPermission ? "Edit Allowed" : "Edit Denied", user.socketId);
    }
  };

  const handleRemoveUser = () => {
    if (isHost) {
      socket?.emit("kickUser", { roomId, targetId: user.socketId });
      console.log("Removed User:", user.socketId);
    }
  };

  // Generate initials for the fallback avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get color based on username (consistent color for same username)
  const getUserColor = (name: string) => {
    const colors = [
      "from-pink-500 to-rose-500",
      "from-blue-500 to-cyan-500",
      "from-violet-500 to-purple-500",
      "from-green-500 to-emerald-500",
      "from-amber-500 to-orange-500",
      "from-indigo-500 to-blue-500",
      "from-teal-500 to-cyan-500",
      "from-red-500 to-pink-500",
    ];
    
    // Simple hash function to get consistent color for same name
    const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
  };

  // Border color based on user permissions
  const borderColor = user.host 
    ? "border-yellow-500/50" 
    : isEditing 
      ? "border-blue-500/50" 
      : "border-gray-700";

  const glowColor = user.host 
    ? "ring-yellow-500/20" 
    : isEditing 
      ? "ring-blue-500/20" 
      : "ring-transparent";

  return (
    <motion.div
      className={`relative flex flex-col items-center p-4 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg border ${borderColor} ${isHovered ? "ring-4" : ""} ${glowColor} transition-all duration-300`}
      whileHover={{ y: -5, scale: 1.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Status indicator */}
      <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-500 ring-2 ring-green-500/30"></div>
      
      {/* Host badge */}
      {user.host && (
        <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-xs font-bold text-white px-2 py-0.5 rounded-lg shadow-lg">
          Host
        </div>
      )}

      {/* Edit permission badge */}
      {!user.host && isEditing && (
        <div className="absolute -top-2 -left-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-xs font-bold text-white px-2 py-0.5 rounded-lg shadow-lg">
          Editor
        </div>
      )}

      {/* User avatar with proper gradient ring */}
      <div className={`relative rounded-full p-1 overflow-hidden ${
        user.host 
          ? "bg-gradient-to-r from-yellow-500 to-amber-600" 
          : isEditing 
            ? "bg-gradient-to-r from-blue-500 to-cyan-600"
            : "bg-gradient-to-r from-gray-700 to-gray-600"
      }`}>
        {user.profilePicture && !imageError ? (
          // Profile picture if available
          <Image 
            width={100}
            height={100}
            src={user.profilePicture} 
            alt={user.userName}
            className="w-16 h-16 rounded-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          // Beautiful fallback avatar with initials
          <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${getUserColor(user.userName)}`}>
            <span className="text-white font-bold text-xl">{getInitials(user.userName)}</span>
          </div>
        )}
        
        {/* Subtle animated glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Username */}
      <div className="mt-3 text-center">
        <h4 className="font-semibold text-white">{user.userName}</h4>
        <p className="text-xs text-gray-400 mt-1">{user.socketId.slice(0, 8)}...</p>
      </div>

      {/* Controls for host */}
      {isHost && !user.host && isHovered && (
        <motion.div 
          className="mt-4 w-full flex justify-between gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={handleToggleEdit}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center ${
              isEditing
                ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {isEditing ? (
              <>
                <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Revoke Edit
              </>
            ) : (
              <>
                <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Allow Edit
              </>
            )}
          </button>
          
          <button
            onClick={handleRemoveUser}
            className="flex-1 py-1.5 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove
          </button>
        </motion.div>
      )}

      {/* More options button for host */}
      {isHost && !user.host && !isHovered && (
        <button
          className="absolute bottom-2 right-2 p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" 
            />
          </svg>
        </button>
      )}
    </motion.div>
  );
};

export default BLUser;