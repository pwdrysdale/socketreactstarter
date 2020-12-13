const express = require("express");
const fs = require("fs");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use(express.static(path.join(__dirname + "public")));

io.on("connection", (socket) => {
  socket.emit("connected", socket.id);
  () => console.log(`${socket.id} has connected`);

  socket.on("chatMessage", (message) => {
    console.log(message);
    io.emit("chatMessage", message);
  });

  io.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});

const port = process.env.PORT || 5000;

server.listen(port);
