"use client";

import { createContext, useContext, ReactNode, useState, useCallback, useRef, useEffect } from "react";
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
  resetSocket: () => void;
  users: User[];
  setUsers: (users: User[] | ((prevUsers: User[]) => User[])) => void;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const isConnecting = useRef(false);
  const connectionAttempts = useRef(0);
  const maxRetries = 3;

  const createSocket = useCallback((url: string) => {
    // Prevent multiple connections
    if (socketRef.current?.connected || isConnecting.current) {
      console.log("Socket already exists or connecting, skipping...");
      return;
    }

    // Reset connection attempts
    connectionAttempts.current = 0;
    isConnecting.current = true;

    const connectSocket = () => {
      console.log(`🔄 Attempting to connect to ${url} (Attempt ${connectionAttempts.current + 1}/${maxRetries})`);

      const newSocket = io(url, {
        transports: ["websocket", "polling"], // Allow both transports
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: maxRetries,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        autoConnect: true,
        // FIXED: Prevent disconnection on tab switch
        closeOnBeforeunload: false
      });

      // Connection successful
      newSocket.on("connect", () => {
        console.log("🟢 Socket connected:", newSocket.id);
        socketRef.current = newSocket;
        setIsConnected(true);
        isConnecting.current = false;
        connectionAttempts.current = 0;
      });

      // Connection failed
      newSocket.on("connect_error", (error) => {
        console.error("❌ Socket connection error:", error);
        connectionAttempts.current++;

        if (connectionAttempts.current >= maxRetries) {
          console.error("❌ Max connection attempts reached");
          isConnecting.current = false;
          setIsConnected(false);
          newSocket.disconnect();
        }
      });

      // Disconnection
      newSocket.on("disconnect", (reason: string) => {
        console.log("🔴 Socket disconnected:", reason);
        setIsConnected(false);

        // IMPROVED: Better disconnect reason handling
        if (reason !== "io client disconnect" && reason !== "client namespace disconnect") {
          isConnecting.current = false;
        }
      });

      // Reconnection attempt
      newSocket.on("reconnect_attempt", (attemptNumber) => {
        console.log(`🔄 Reconnection attempt ${attemptNumber}`);
      });

      // Reconnection successful
      newSocket.on("reconnect", (attemptNumber) => {
        console.log(`🟢 Reconnected after ${attemptNumber} attempts`);
        setIsConnected(true);
      });

      // Reconnection failed
      newSocket.on("reconnect_failed", () => {
        console.error("❌ Reconnection failed");
        setIsConnected(false);
        isConnecting.current = false;
      });

      return newSocket;
    };

    connectSocket();
  }, []);

  const resetSocket = useCallback(() => {
    if (socketRef.current) {
      console.log("🗑️ Cleaning up socket...");

      const socket = socketRef.current;

      // Remove all listeners first
      socket.removeAllListeners();

      // Disconnect the socket
      socket.disconnect();

      // Clear the reference
      socketRef.current = null;

      // Reset state
      setUsers([]);
      setIsConnected(false);
      isConnecting.current = false;
      connectionAttempts.current = 0;

      console.log("✅ Socket cleaned up");
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("🧹 SocketProvider unmounting, cleaning up...");
      resetSocket();
    };
  }, [resetSocket]);

  // Connection status monitoring
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const checkConnection = () => {
      setIsConnected(socket.connected);
    };

    const interval = setInterval(checkConnection, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketRef.current]);

  const value = {
    socket: socketRef.current,
    createSocket,
    users,
    setUsers,
    resetSocket,
    isConnected
  };

  return (
    <SocketContext.Provider value={value}>
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