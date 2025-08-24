"use client";

import Classroom from "@/app/(ui)/Components/pages/ClassRoom/Classroom";
import { useSocket } from "@/app/Context/Socket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface User {
  socketId: string;
  userName: string;
  canEdit: boolean;
  host: boolean;
}

interface Classroom {
  id: string;
  title: string;
  description: string;
  banner?: string;
  startTime: string;
  status: string;
  isStarted: boolean;
  isDone: boolean;
  roomId: string;
  ownerId: string;
  owner: {
    admissionNumber: string;
    name: string;
    email: string;
    username: string;
  };
}

const Room = () => {
  const { roomId } = useParams();
  const router = useRouter();
  const roomIdString = Array.isArray(roomId) ? roomId[0] : roomId || "";

  const [isHost, setIsHost] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [error, setError] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const { socket, createSocket, setUsers, resetSocket } = useSocket();

  // Refs to prevent multiple executions
  const hasInitialized = useRef(false);
  const isJoining = useRef(false);
  const cleanupExecuted = useRef(false);
  const socketListenersSet = useRef(false);

  // Configure axios defaults
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  // Initialize classroom
  useEffect(() => {
    if (hasInitialized.current) return;

    const initializeClassroom = async () => {
      hasInitialized.current = true;
      setIsLoading(true);

      try {
        if (!roomIdString) {
          setError("Invalid room ID");
          setIsLoading(false);
          return;
        }

        console.log("🔄 Initializing classroom...");

        const classroomRes = await axios.get(`http://localhost:5100/api/classroom/${roomIdString}`);
        if (!classroomRes.data.success) {
          throw new Error(classroomRes.data.message || "Failed to fetch classroom details");
        }

        const classroomData = classroomRes.data.classroom;
        setClassroom(classroomData);

        const startRes = await axios.post("http://localhost:5100/api/host/class/start", {
          classroomId: roomIdString
        });

        if (!startRes.data.success) {
          throw new Error(startRes.data.message || "Failed to start/join class");
        }

        setUserName(startRes.data.userName);
        setIsOwner(startRes.data.isOwner || false);

        if (startRes.data.classroom) {
          setClassroom(startRes.data.classroom);
        }

        toast.success(startRes.data.message);
        console.log("✅ Classroom initialized successfully");

        // Set loading to false here since we have the data we need
        setIsLoading(false);

      } catch (error: unknown) {
        console.error("❌ Classroom initialization error:", error);
        setIsLoading(false);

        let errorMessage = "Internal Server Error";
        let status: number | undefined;

        if (typeof error === "object" && error !== null) {
          // Check if error is an AxiosError
          const err = error as { response?: { status?: number; data?: { message?: string } }; message?: string };
          status = err.response?.status;

          if (status === 401) {
            errorMessage = "Please login to access this classroom";
            router.push("/login");
            return;
          } else if (status === 403) {
            errorMessage = err.response?.data?.message || "You don't have permission to access this classroom";
          } else if (status === 404) {
            errorMessage = "Classroom not found";
          } else if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
          } else if (err.message) {
            errorMessage = err.message;
          }
        }

        toast.error(errorMessage);
        setError(errorMessage);

        // Redirect after showing error
        setTimeout(() => {
          if (status === 401) {
            router.push("/login");
          } else {
            router.push("/events");
          }
        }, 3000);
      }
    };

    initializeClassroom();
  }, [roomIdString, router]);

  // Create socket when ready
  useEffect(() => {
    if (userName && classroom?.roomId && !socket && !error && !isLoading) {
      console.log("🔌 Creating socket connection...");
      createSocket("http://localhost:5100");
    }
  }, [userName, classroom?.roomId, socket, createSocket, error, isLoading]);

  // Setup socket listeners
  useEffect(() => {
    if (!socket || socketListenersSet.current) {
      return;
    }

    socketListenersSet.current = true;
    console.log("🎧 Setting up socket listeners");

    const handleJoinSuccess = ({ message, isOwner }: {
      message: string;
      isOwner: boolean;
    }) => {
      console.log("✅ Join success:", message);
      setIsHost(isOwner);
      setIsLoading(false);
    };

    const handleJoined = ({ clients, userName: newUserName, owner }: {
      clients: User[];
      userName: string;
      owner: string;
    }) => {
      console.log("✅ Successfully joined room - users updated");
      if (Array.isArray(clients)) {
        setUsers(clients);
      }
      if (newUserName && newUserName !== userName) {
        toast.success(`${newUserName} joined the room.`);
      }
      setIsHost(socket.id === owner);
    };

    const handleRoomTerminated = () => {
      console.log("🚪 Room terminated");
      toast.error("Room has been terminated by the owner.");
      resetSocket();
      router.push("/events");
    };

    const handleEditPermissionUpdated = ({ targetId, canEdit }: {
      targetId: string;
      canEdit: boolean;
    }) => {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.socketId === targetId ? { ...u, canEdit } : u
        )
      );

      if (targetId === socket.id) {
        toast(`Edit permission ${canEdit ? 'granted' : 'revoked'}`);
      }
    };

    const handleDisconnected = ({ clients, userName: leftUser }: {
      clients: User[];
      userName: string;
    }) => {
      if (Array.isArray(clients)) {
        setUsers(clients);
      }
      if (leftUser && leftUser !== userName) {
        toast.error(`${leftUser} left the room.`);
      }
    };

    const handleKicked = () => {
      toast.error("You have been removed from the room.");
      resetSocket();
      router.push("/events");
    };

    const handleUpdatedUsersAfterRemoving = ({ leftUser, clients }: {
      leftUser: string;
      clients: User[];
    }) => {
      if (Array.isArray(clients)) {
        setUsers(clients);
      }
      if (leftUser) {
        toast.error(`${leftUser} has been removed from the room.`);
      }
    };

    const handleError = ({ message }: { message: string }) => {
      console.error("🚨 Socket error:", message);
      toast.error(message);

      if (message.includes("not started") || message.includes("not in the class")) {
        setError(message);
        setIsLoading(false);
        setTimeout(() => router.push("/events"), 3000);
      }
    };

    interface Message {
      id: string;
      userName: string;
      content: string;
      timestamp: string;
      // Add other fields as needed
    }

    const handleLoadMessages = (messages: Message[]) => {
      console.log("📩 Loaded messages:", messages.length);
    };

    const handleLoadCode = (code: string) => {
      console.log("💻 Loaded code:", code.length, "characters");
    };

    // Add event listeners
    socket.on("joinSuccess", handleJoinSuccess);
    socket.on("joined", handleJoined);
    socket.on("roomTerminated", handleRoomTerminated);
    socket.on("editPermissionUpdated", handleEditPermissionUpdated);
    socket.on("disconnected", handleDisconnected);
    socket.on("kicked", handleKicked);
    socket.on("updatedUsersAfterRemoving", handleUpdatedUsersAfterRemoving);
    socket.on("error", handleError);
    socket.on("loadMessages", handleLoadMessages);
    socket.on("loadCode", handleLoadCode);

    // Cleanup function
    return () => {
      console.log("🧹 Cleaning up socket listeners");
      socket.off("joinSuccess", handleJoinSuccess);
      socket.off("joined", handleJoined);
      socket.off("roomTerminated", handleRoomTerminated);
      socket.off("editPermissionUpdated", handleEditPermissionUpdated);
      socket.off("disconnected", handleDisconnected);
      socket.off("kicked", handleKicked);
      socket.off("updatedUsersAfterRemoving", handleUpdatedUsersAfterRemoving);
      socket.off("error", handleError);
      socket.off("loadMessages", handleLoadMessages);
      socket.off("loadCode", handleLoadCode);

      socketListenersSet.current = false;
    };
  }, [socket, userName, setUsers, resetSocket, router]);

  // Join room when socket is ready
  useEffect(() => {
    if (!socket || !classroom?.roomId || !userName || isJoining.current || error || isLoading) {
      return;
    }

    isJoining.current = true;
    console.log("🚪 Joining room:", classroom.roomId);

    // Join the room
    socket.emit("join", { roomId: classroom.roomId, userName });

    // Set a timeout to handle cases where join doesn't respond
    const joinTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("⏰ Join timeout, something went wrong");
        setError("Failed to join the room. Please try again.");
        setIsLoading(false);
      }
    }, 15000); // 15 second timeout

    return () => {
      clearTimeout(joinTimeout);
      isJoining.current = false;
    };
  }, [socket, classroom?.roomId, userName, error, isLoading]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (!cleanupExecuted.current) {
        cleanupExecuted.current = true;
        console.log("🔄 Component unmounting, cleaning up...");
        resetSocket();
      }
    };
  }, [resetSocket]);

  // FIXED: Handle browser close/refresh for owners - REMOVED problematic visibilitychange
  useEffect(() => {
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      if (isOwner && classroom?.roomId) {
        e.preventDefault();
        e.returnValue = '';

        try {
          // Try to stop the class when owner leaves
          await axios.post('http://localhost:5100/api/host/class/stop', {
            classroomId: classroom.roomId
          });
        } catch (error) {
          console.error("Failed to stop class on beforeunload:", error);
        }
      }
    };

    // REMOVED: The problematic visibilitychange event listener
    // This was causing disconnections when users switched tabs/windows

    /* 
    REMOVED CODE:
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isOwner && socket) {
        socket.emit("terminateRoom", { roomId: classroom?.roomId });
      }
    };
    */

    if (isOwner) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      // document.addEventListener('visibilitychange', handleVisibilityChange); // REMOVED
    }

    return () => {
      if (isOwner) {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        // document.removeEventListener('visibilitychange', handleVisibilityChange); // REMOVED
      }
    };
  }, [isOwner, classroom?.roomId, socket]);

  // ADDED: Better page navigation detection
  useEffect(() => {
    const handleRouteChange = () => {
      // This will trigger when user navigates to a different route
      if (isOwner && classroom?.roomId && socket) {
        console.log("🔄 Owner navigating away, terminating room...");
        socket.emit("terminateRoom", { roomId: classroom.roomId });
      }
      resetSocket();
    };

    // Listen for route changes (Next.js specific)
    const handlePopState = () => {
      handleRouteChange();
    };

    // Listen for programmatic navigation
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOwner, classroom?.roomId, socket, resetSocket]);

  const handleStopClass = async () => {
    if (!isOwner || !classroom?.roomId) return;

    try {
      const response = await axios.post('http://localhost:5100/api/host/class/stop', {
        classroomId: classroom.roomId
      });

      if (response.data.success) {
        toast.success("Class stopped successfully");
        if (socket) {
          socket.emit("terminateRoom", { roomId: classroom.roomId });
        }
        resetSocket();
        router.push("/events");
      }
    } catch (error: unknown) {
      console.error("Error stopping class:", error);
      if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-expect-error: error type is unknown, but we expect response property
        toast.error(error.response?.data?.message || "Failed to stop class");
      } else {
        toast.error("Failed to stop class");
      }
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 max-w-md mx-4">
          <div className="mb-4">
            <svg className="w-16 h-16 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.732 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <p className="text-red-400 text-lg mb-6 font-semibold">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 font-medium"
            >
              Retry
            </button>
            <button
              onClick={() => router.push("/events")}
              className="w-full px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
            >
              Go Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-blue-500"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-purple-500 animate-spin" style={{ animationDelay: '0.15s', animationDuration: '1.5s' }}></div>
          </div>
          <div className="space-y-2">
            <p className="text-white text-lg font-medium">
              {!socket ? "Connecting..." :
                socket && !classroom ? "Loading classroom..." :
                  "Joining classroom..."}
            </p>
            <p className="text-gray-400 text-sm">Please wait while we prepare your session</p>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!classroom) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          <div className="mb-4">
            <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.413M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <p className="text-gray-400 text-lg font-medium mb-4">Classroom not found</p>
          <button
            onClick={() => router.push("/events")}
            className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Owner controls */}
      {isOwner && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={handleStopClass}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium shadow-lg"
            title="Stop Class"
          >
            End Class
          </button>
        </div>
      )}

      {/* Class info banner */}
      {classroom && (
        <div className="fixed top-4 left-4 z-40 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${classroom.isStarted ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <div>
              <p className="text-sm font-semibold">{classroom.title}</p>
              <p className="text-xs text-gray-300">
                {isOwner ? "Host" : "Participant"} • {userName}
              </p>
            </div>
          </div>
        </div>
      )}

      <Classroom roomId={classroom.roomId} isHost={isHost} />
    </div>
  );
};

export default Room;