const app = require("express");
const server = app();
server.get("/", (req, res) => {
  res.sendfile("index.html");
});

server.listen(3000, () => {
  console.log("start server on port: 3000");
});