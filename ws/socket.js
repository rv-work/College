const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const   axios  = require("axios");


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const rooms = {};
const messages = {};
const owners = {};
const code = {};
const CanEditCode = {};

const getAllClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => ({
    socketId,
    userName: rooms[socketId],
    canEdit: CanEditCode[roomId]?.includes(socketId) || false,
    host: owners[roomId] === socketId,
  }));
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join", ({ roomId, userName }) => {
    if (rooms[socket.id]) return  ;

    rooms[socket.id] = userName;
    socket.join(roomId);

    if (!messages[roomId]) messages[roomId] = [];
    if (!code[roomId]) code[roomId] = "";

    if (!CanEditCode[roomId]) {
      CanEditCode[roomId] = [];
      CanEditCode[roomId].push(socket.id);
    }

    if (!owners[roomId]) {
      owners[roomId] = socket.id;
    }

    socket.emit("loadMessages", messages[roomId]);
    socket.emit("loadCode", code[roomId]);

    const clients = getAllClients(roomId);
    io.to(roomId).emit("joined", {
      clients,
      userName,
      socketId: socket.id,
      owner: owners[roomId],
    });
  });

  socket.on("chatMessage", ({ roomId, message }) => {
    const senderName = rooms[socket.id] || "Unknown";

    const newMessage = {
      user: senderName,
      message,
      socketId: socket.id,
      timestamp: new Date().toLocaleTimeString(),
    };

    messages[roomId].push(newMessage);
    io.to(roomId).emit("chatMessage", newMessage);
  });

  socket.on("codeChange", ({ roomId, updatedCode }) => {
    if (!code[roomId]) code[roomId] = "";
    code[roomId] = updatedCode;

    socket.to(roomId).emit("codeChange", updatedCode);
  });

  socket.on("toggleEdit", ({ roomId, targetId, canEdit }) => {
    if (!CanEditCode[roomId]) return;

    if (canEdit) {
      if (!CanEditCode[roomId].includes(targetId)) {
        CanEditCode[roomId].push(targetId);
      }
    } else {
      CanEditCode[roomId] = CanEditCode[roomId].filter((id) => id !== targetId);
    }

    io.to(roomId).emit("editPermissionUpdated", { targetId, canEdit });
  });

  socket.on("kickUser", ({ roomId, targetId }) => {
    if (!roomId || !targetId) return;
  
    if (!rooms[targetId]) return console.log(`❌ User not found: ${targetId}`);
  
    const leftUser = rooms[targetId];
  
    io.sockets.sockets.get(targetId)?.leave(roomId);
  
    delete rooms[targetId];
    CanEditCode[roomId] = CanEditCode[roomId]?.filter((id) => id !== targetId);
  
    const clients = getAllClients(roomId);
    io.to(roomId).emit("updatedUsersAfterRemoving", { leftUser, clients });
    io.to(targetId).emit("kicked", { message: "You have been removed from the room." });
  });

  const terminateRoom = async (roomId) => {
    io.to(roomId).emit("roomTerminated", { roomId });
    const clients = getAllClients(roomId);
    clients.forEach((client) =>
      io.sockets.sockets.get(client.socketId)?.leave(roomId)
    );
  
    delete messages[roomId];
    delete owners[roomId];
    delete code[roomId];
    delete CanEditCode[roomId];
  
    console.log(`🚪 Room ${roomId} terminated.`);
  };


  socket.on("terminateRoom", ({roomId}) => {
    for (let roomId of socket.rooms) {
      if (roomId !== socket.id) {
        const isOwner = owners[roomId] === socket.id;

        if (isOwner) {
          terminateRoom(roomId);
        } else {
          const leftUser = rooms[socket.id];
          delete rooms[socket.id];

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
    console.log(`❌ User disconnected: ${socket.id}`);
  });
  socket.on("disconnecting", () => {
    for (let roomId of socket.rooms) {
      if (roomId !== socket.id) {
        const isOwner = owners[roomId] === socket.id;

        if (isOwner) {
          terminateRoom(roomId);
        } else {
          const leftUser = rooms[socket.id];
          delete rooms[socket.id];

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
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

server.listen(5100, () => {
  console.log(`✅ WebSocket server running on http://localhost:5100`);
});

