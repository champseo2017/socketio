const app = require("express")();
const http = require("http").Server(app);

app.get("/", (req, res) => {
  res.sendfile("index.html");
});

http.listen(3000, () => {
  console.log("start server on port: 3000");
});