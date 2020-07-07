const app = require("express");
const server = app();
const http = require("http").Server(server);
const io = require("socket.io")(http);

server.get("/", (req, res) => {
  res.sendfile("index.html");
});

let clients = 0; // คอยนับจำนวนเครื่องที่เชื่อมต่อ
io.on("connection", (socket) => {
  clients++;
  io.sockets.emit("broadcast", {
    message: clients + " clients connected!",
  });
  socket.on("disconnect", () => {
    clients--;
    io.sockets.emit("broadcast", {
      message: clients + " clients connected!",
    });
  });
});

http.listen(8080, () => {
  console.log("start server on port: 8080");
});
