 const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));

const server = app.listen(8080, () => console.log("server is running"));

const io = socket(server);

io.on("connection", socket => {
  console.log("a user connected", socket.id);
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
