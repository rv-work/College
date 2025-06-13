"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { io, Socket } from "socket.io-client";

interface User {
  socketId: string;
  userName: string;
  canEdit: boolean;
  host: boolean;
}

interface SocketContextType {
  socket: Socket | null;
  createSocket: (url: string) => void;
  resetSocket : () => void
  users: User[];
  setUsers: (users: User[] | ((prevUsers: User[]) => User[])) => void; // ✅ Fixed type h
}



const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {

  const [socket, setSocket] = useState<Socket | null>(null);
  const [users, setUsers] = useState<User[]>([]);


  const createSocket = (url: string) => {
    if (!socket) {
      const newSocket = io(url, {
        transports: ["websocket"],
      });
      setSocket(newSocket);
      console.log("Socket Initialized");
    }
  };
  const resetSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      console.log("socket deleted")
    }
  };

  return (
    <SocketContext.Provider value={{ socket, createSocket , users , setUsers  ,resetSocket}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
