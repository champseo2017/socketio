const app = require("express");
const server = app();
const http = require("http").Server(server);
const io = require("socket.io")(http);

server.get("/", (req, res) => {
  res.sendfile("index.html");
});

const users = [];
io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("setUsername", (data) => {
    if (users.indexOf(data) > -1) {
      socket.emit("userExists", data + " มีผู้ใช้ชื่อนี้แล้ว กรุณาใช้ชื่อใหม่");
    } else {
      users.push(data);
      socket.emit("userSet", { username: data });
    }
  });
  socket.on('msg', (data) => {
    io.sockets.emit('newmsg', data);
  })
});

http.listen(8080, () => {
  console.log("start server on port: 8080");
});
