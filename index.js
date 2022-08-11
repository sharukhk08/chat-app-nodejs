const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  }),
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log("User join Room", data);
    }),
    socket.on("send_message", (data) => {
      //   socket.join(data);
      console.log("Message", data);
      socket.to(data.room).emit("receive_message", data);
    }),
    socket.on("chat message", (msg) => {
      console.log("Message: " + msg);
      io.emit("chat message", msg);
    }),
    socket.on("typing", (msg) => {
      console.log("Typing: " + msg);
      io.emit("typing", msg);
    }),
    socket.on("stop typing", (msg) => {
      console.log("Stop typing: " + msg);
      io.emit("stop typing", msg);
    }),
    socket.on("join", (msg) => {
      console.log("Join: " + msg);
      io.emit("join", msg);
    }),
    socket.on("leave", (msg) => {
      console.log("Leave: " + msg);
      io.emit("leave", msg);
    }),
    socket.on("call", (msg) => {
      console.log("Call: " + msg);
      io.emit("call", msg);
    }),
    socket.on("answer", (msg) => {
      console.log("Answer: " + msg);
      io.emit("answer", msg);
    }),
    socket.on("reject", (msg) => {
      console.log("Reject: " + msg);
      io.emit("reject", msg);
    }),
    socket.on("end", (msg) => {
      console.log("End: " + msg);
      io.emit("end", msg);
    }),
    socket.on("error", (msg) => {
      console.log("Error: " + msg);
      io.emit("error", msg);
    });
});

server
  .listen(3001, () => {
    console.log("Server is running on port 3001");
  })
  .on("error", (err) => {
    console.log(err);
  });
