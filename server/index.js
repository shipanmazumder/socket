var express = require("express");
var app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});
app.get("/", (req, res) => {
  return res.send("<h2>Welcome to Express App<h2>");
});
var position = {
  x: 100,
  y: 100,
};
io.on("connection", (socket) => {
  console.log("connect");
  socket.emit("position", position);
  socket.on("move", (data) => {
    switch (data) {
      case "left":
        position.x -= 5;
        io.emit("position", position);
        break;
      case "right":
        position.x += 5;
        io.emit("position", position);
        break;
      case "up":
        position.y -= 5;
        io.emit("position", position);
        break;
      case "down":
        position.y += 5;
        io.emit("position", position);
        break;
    }
  });
});
var Port = process.env.PORT || 3000;
var IP = process.env.IP || "127.0.0.1";
server.listen(Port, IP, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is listening at " + IP + ":" + Port);
  }
});
