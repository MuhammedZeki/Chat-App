const { Server } = require("socket.io");
const { createServer } = require("http");
const express = require("express");
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

//
function getReceviredSocketId(userId) {
  return userSocketMapping[userId];
}

const userSocketMapping = {}; // ali:1235 , userId(db'den gelir):SocketId

io.on("connection", (socket) => {
  console.log("New client connected-->", socket.id);
  const userId = socket.handshake.query.userId; // client'dan gelen userId
  if (userId) {
    userSocketMapping[userId] = socket.id;
    socket.userId = userId;
  } // userId ile socket.id'yi eşleştiriyoruz
  //send online users
  io.emit("onlineUsers", Object.keys(userSocketMapping));

  socket.on("disconnect", () => {
    console.log("Client disconnected-->", socket.id);
    delete userSocketMapping[userId]; // client disconnect olunca userId'yi sil
    io.emit("onlineUsers", Object.keys(userSocketMapping)); // online userları güncelle
  });
});

module.exports = { io, server, app, getReceviredSocketId };
