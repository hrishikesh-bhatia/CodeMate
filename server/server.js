const { createServer } = require("http");
const { Server } = require("socket.io");
const  registerCodeExecutionSocket  = require("./sockets/codeSocket.js") ;
// const User = require("./models/User.js");
const app = require("./app.js");
require("dotenv").config({ path: "../.env" }); // Add this at the top of your main file
const PORT = process.env.PORT || 5000;
console.log("Loaded API Key:", process.env.JUDGE0_API_KEY);


const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://hrishikeshbhatia:6vwjcIix0URVWB4k@cluster0.cfnaxex.mongodb.net/codemate?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Socket connection
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-update", code);
  });

  registerCodeExecutionSocket(io, socket);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
