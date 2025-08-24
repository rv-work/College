const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");

const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is required"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("❌ Token verification error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

// In-memory storage for rooms
const rooms = {}; // socketId -> userName
const messages = {}; // roomId -> messages[]
const owners = {}; // roomId -> socketId
const code = {}; // roomId -> code string
const CanEditCode = {}; // roomId -> socketId[]
const disconnectionTimers = {}; // roomId -> timeout
const activeHosts = {}; // roomId -> boolean (is host currently connected)

const getAllClients = (roomId) => {
  const roomSockets = io.sockets.adapter.rooms.get(roomId);
  if (!roomSockets) return [];
  
  return Array.from(roomSockets).map((socketId) => ({
    socketId,
    userName: rooms[socketId] || "Unknown",
    canEdit: CanEditCode[roomId]?.includes(socketId) || false,
    host: owners[roomId] === socketId,
  }));
};

// API Routes

// Start Class Route
app.post("/api/host/class/start", authenticateToken, async (req, res) => {
  try {
    const { classroomId } = req.body;
    const userId = req.userId;

    if (!classroomId) {
      return res.status(400).json({
        success: false,
        message: "Classroom ID is required!"
      });
    }

    // Find classroom by roomId
    const classroom = await prisma.classroom.findUnique({
      where: { roomId: classroomId },
      include: {
        owner: {
          select: {
            admissionNumber: true,
            name: true,
            email: true,
            username: true
          }
        }
      }
    });

    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found!"
      });
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { admissionNumber: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }

    // Check if user is trying to join as non-owner when class is not started
    if (!classroom.isStarted && classroom.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Class is not started yet. Only owner can start the class!"
      });
    }

    // Check if class is started but host is not connected
    if (classroom.isStarted && classroom.ownerId !== userId && !activeHosts[classroomId]) {
      return res.status(403).json({
        success: false,
        message: "Host is not in the class. Please wait for the host to join!"
      });
    }

    // If class is already started and user is not owner, just join
    if (classroom.isStarted && classroom.ownerId !== userId) {
      // Create connection if doesn't exist
      const existingConnection = await prisma.classroomConnect.findUnique({
        where: {
          userId_classId: {
            userId: userId,
            classId: classroom.id,
          },
        },
      });

      if (!existingConnection) {
        await prisma.classroomConnect.create({
          data: {
            userId: userId,
            classId: classroom.id,
          },
        });
      }

      return res.json({
        success: true,
        message: "Joined active class successfully!",
        userName: user.name,
        classroom: classroom,
        isOwner: false
      });
    }

    // Check if user is the owner for starting the class
    if (classroom.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Only the class owner can start the class!"
      });
    }

    // Start the class if not already started
    if (!classroom.isStarted) {
      await prisma.classroom.update({
        where: { roomId: classroomId },
        data: { isStarted: true },
      });

      console.log(`✅ Class started: ${classroom.title} by ${user.name}`);
    }

    return res.json({
      success: true,
      message: classroom.isStarted ? "Joined active class successfully!" : "Class started successfully!",
      userName: user.name,
      classroom: { ...classroom, isStarted: true },
      isOwner: true
    });

  } catch (error) {
    console.error("❌ Error in starting class:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// Stop Class Route
app.post("/api/host/class/stop", authenticateToken, async (req, res) => {
  try {
    const { classroomId } = req.body;
    const userId = req.userId;

    if (!classroomId) {
      return res.status(400).json({
        success: false,
        message: "Classroom ID is required!"
      });
    }

    const classroom = await prisma.classroom.findUnique({
      where: { roomId: classroomId },
    });

    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found!"
      });
    }

    // Only owner can stop the class
    if (classroom.ownerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Only the class owner can stop the class!"
      });
    }

    // Update classroom status
    await prisma.classroom.update({
      where: { id: classroom.id },
      data: { 
        isStarted: false,
        isDone: true 
      },
    });

    // Clean up socket room data
    const roomId = classroom.roomId;
    await terminateRoom(roomId);

    console.log(`🚪 Class stopped: ${classroom.title} by user ${userId}`);

    return res.json({
      success: true,
      message: "Class stopped successfully!"
    });

  } catch (error) {
    console.error("❌ Error in stopping class:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// Get Classroom Details Route
app.get("/api/classroom/:roomId", authenticateToken, async (req, res) => {
  try {
    const { roomId } = req.params;

    const classroom = await prisma.classroom.findUnique({
      where: { roomId: roomId },
      include: {
        owner: {
          select: {
            admissionNumber: true,
            name: true,
            email: true,
            username: true
          }
        }
      }
    });

    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: "Classroom not found!"
      });
    }

    return res.json({
      success: true,
      classroom: classroom
    });

  } catch (error) {
    console.error("❌ Error fetching classroom:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

// Helper function to terminate room
const terminateRoom = async (roomId) => {
  console.log(`🚪 Terminating room: ${roomId}`);
  
  // Clear any pending disconnection timer
  if (disconnectionTimers[roomId]) {
    clearTimeout(disconnectionTimers[roomId]);
    delete disconnectionTimers[roomId];
  }
  
  // Mark host as inactive
  activeHosts[roomId] = false;
  
  // Notify all clients
  io.to(roomId).emit("roomTerminated", { roomId });
  
  // Remove all clients from room
  const clients = getAllClients(roomId);
  clients.forEach((client) => {
    const clientSocket = io.sockets.sockets.get(client.socketId);
    if (clientSocket) {
      clientSocket.leave(roomId);
      delete rooms[client.socketId];
    }
  });

  // Clean up room data
  delete messages[roomId];
  delete owners[roomId];
  delete code[roomId];
  delete CanEditCode[roomId];
  delete activeHosts[roomId];

  console.log(`🗑️ Room ${roomId} cleaned up`);
};

// Socket.io Connection Handling - FIXED VERSION
io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  socket.on("join", async ({ roomId, userName }) => {
    try {
      console.log(`👤 ${userName} attempting to join room: ${roomId}`);

      // Check if classroom exists and is started
      const classroom = await prisma.classroom.findUnique({
        where: { roomId: roomId }
      });

      if (!classroom) {
        socket.emit("error", { message: "Classroom not found!" });
        return;
      }

      if (!classroom.isStarted) {
        socket.emit("error", { message: "Class has not been started yet!" });
        return;
      }

      // Prevent duplicate joins
      if (rooms[socket.id] && socket.rooms.has(roomId)) {
        console.log(`⚠️ Socket ${socket.id} already in room ${roomId}`);
        return;
      }

      // Clean up any previous room membership
      if (rooms[socket.id]) {
        for (let prevRoomId of socket.rooms) {
          if (prevRoomId !== socket.id) {
            socket.leave(prevRoomId);
            console.log(`🚪 Left previous room: ${prevRoomId}`);
          }
        }
      }

      // Clear any pending disconnection timer for this room
      if (disconnectionTimers[roomId]) {
        clearTimeout(disconnectionTimers[roomId]);
        delete disconnectionTimers[roomId];
        console.log(`⏰ Cleared disconnection timer for room ${roomId}`);
      }

      rooms[socket.id] = userName;
      socket.join(roomId);

      // Initialize room data
      if (!messages[roomId]) messages[roomId] = [];
      if (!code[roomId]) code[roomId] = "";
      if (!CanEditCode[roomId]) CanEditCode[roomId] = [];

      // Add edit permission if not already present
      if (!CanEditCode[roomId].includes(socket.id)) {
        CanEditCode[roomId].push(socket.id);
      }

      // Determine if user is the owner
      const isOwner = classroom.ownerId === userName;
      
      // Set owner if not already set or if current user is the actual owner
      if (!owners[roomId] || isOwner) {
        owners[roomId] = socket.id;
        activeHosts[roomId] = true;
        console.log(`👑 ${userName} became the owner of room ${roomId}`);
      }

      // Send existing data to the new client
      socket.emit("loadMessages", messages[roomId]);
      socket.emit("loadCode", code[roomId]);

      // Notify all clients about the new user
      const clients = getAllClients(roomId);
      io.to(roomId).emit("joined", {
        clients,
        userName,
        socketId: socket.id,
        owner: owners[roomId],
      });

      console.log(`✅ ${userName} joined room: ${roomId}`);

      // Send success response
      socket.emit("joinSuccess", {
        message: "Successfully joined the room",
        isOwner: owners[roomId] === socket.id
      });

    } catch (error) {
      console.error("❌ Error in join event:", error);
      socket.emit("error", { message: "Failed to join room" });
    }
  });

  socket.on("chatMessage", ({ roomId, message }) => {
    try {
      const senderName = rooms[socket.id] || "Unknown";

      const newMessage = {
        user: senderName,
        message,
        socketId: socket.id,
        timestamp: new Date().toLocaleTimeString(),
      };

      if (!messages[roomId]) messages[roomId] = [];
      messages[roomId].push(newMessage);
      
      io.to(roomId).emit("chatMessage", newMessage);
    } catch (error) {
      console.error("❌ Error in chatMessage:", error);
    }
  });

  socket.on("codeChange", ({ roomId, updatedCode }) => {
    try {
      if (!code[roomId]) code[roomId] = "";
      code[roomId] = updatedCode;

      socket.to(roomId).emit("codeChange", updatedCode);
    } catch (error) {
      console.error("❌ Error in codeChange:", error);
    }
  });

  socket.on("toggleEdit", ({ roomId, targetId, canEdit }) => {
    try {
      if (!CanEditCode[roomId]) return;

      // Only room owner can toggle edit permissions
      if (owners[roomId] !== socket.id) {
        socket.emit("error", { message: "Only room owner can change edit permissions" });
        return;
      }

      if (canEdit) {
        if (!CanEditCode[roomId].includes(targetId)) {
          CanEditCode[roomId].push(targetId);
        }
      } else {
        CanEditCode[roomId] = CanEditCode[roomId].filter((id) => id !== targetId);
      }

      io.to(roomId).emit("editPermissionUpdated", { targetId, canEdit });
      console.log(`🔧 Edit permission ${canEdit ? 'granted' : 'revoked'} for ${targetId} in room ${roomId}`);
    } catch (error) {
      console.error("❌ Error in toggleEdit:", error);
    }
  });

  socket.on("kickUser", ({ roomId, targetId }) => {
    try {
      if (!roomId || !targetId) return;

      // Only room owner can kick users
      if (owners[roomId] !== socket.id) {
        socket.emit("error", { message: "Only room owner can kick users" });
        return;
      }

      if (!rooms[targetId]) {
        console.log(`❌ User not found: ${targetId}`);
        return;
      }

      const leftUser = rooms[targetId];
      const targetSocket = io.sockets.sockets.get(targetId);

      if (targetSocket) {
        // FIXED: Properly remove user from room
        targetSocket.leave(roomId);
        targetSocket.emit("kicked", { message: "You have been removed from the room." });
        
        // Clean up user data immediately
        delete rooms[targetId];
        if (CanEditCode[roomId]) {
          CanEditCode[roomId] = CanEditCode[roomId].filter((id) => id !== targetId);
        }
      }

      const clients = getAllClients(roomId);
      io.to(roomId).emit("updatedUsersAfterRemoving", { leftUser, clients });
      
      console.log(`👢 User ${leftUser} was kicked from room ${roomId}`);
    } catch (error) {
      console.error("❌ Error in kickUser:", error);
    }
  });

  socket.on("terminateRoom", async ({ roomId }) => {
    try {
      const isOwner = owners[roomId] === socket.id;
      
      if (isOwner) {
        // Update database
        await prisma.classroom.update({
          where: { roomId: roomId },
          data: { isStarted: false }
        });

        await terminateRoom(roomId);
      } else {
        socket.emit("error", { message: "Only room owner can terminate the room" });
      }
    } catch (error) {
      console.error("❌ Error in terminateRoom:", error);
    }
  });

  // FIXED: Better handling of user disconnection
  socket.on("disconnecting", async () => {
    console.log(`🔌 User disconnecting: ${socket.id}`);
    
    try {
      for (let roomId of socket.rooms) {
        if (roomId !== socket.id) {
          const isOwner = owners[roomId] === socket.id;
          const leftUser = rooms[socket.id];

          if (isOwner) {
            // Owner is disconnecting - set grace period
            console.log(`⏳ Owner ${leftUser} disconnecting from room ${roomId}, setting grace period...`);
            
            activeHosts[roomId] = false;
            
            disconnectionTimers[roomId] = setTimeout(async () => {
              // Check if room still exists and owner hasn't reconnected
              if (owners[roomId] === socket.id && !activeHosts[roomId]) {
                console.log(`🚪 Grace period expired for room ${roomId}, terminating...`);
                
                // Update database
                try {
                  await prisma.classroom.update({
                    where: { roomId: roomId },
                    data: { isStarted: false }
                  });
                } catch (error) {
                  console.error("❌ Error updating classroom status:", error);
                }

                await terminateRoom(roomId);
              }
            }, 10000); // 10 second grace period
            
          } else {
            // FIXED: Clean up regular user properly
            console.log(`👤 Regular user ${leftUser} leaving room ${roomId}`);
            
            // Remove user data immediately
            delete rooms[socket.id];
            
            if (CanEditCode[roomId]) {
              CanEditCode[roomId] = CanEditCode[roomId].filter((id) => id !== socket.id);
            }

            // Get updated clients list and notify
            const clients = getAllClients(roomId);
            io.to(roomId).emit("disconnected", {
              clients,
              owner: owners[roomId],
              userName: leftUser,
              roomId
            });
          }
        }
      }
    } catch (error) {
      console.error("❌ Error in disconnecting:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    // FIXED: Final cleanup in case something was missed
    delete rooms[socket.id];
  });
});

// Error handling
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🔄 SIGTERM received, shutting down gracefully');
  
  // Clear all timers
  Object.values(disconnectionTimers).forEach(timer => clearTimeout(timer));
  
  await prisma.$disconnect();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

const PORT = process.env.PORT || 5100;

server.listen(PORT, () => {
  console.log(`✅ WebSocket server running on http://localhost:${PORT}`);
  console.log(`🔗 CORS enabled for http://localhost:3000`);
  console.log(`🛡️ JWT Authentication enabled`);
});