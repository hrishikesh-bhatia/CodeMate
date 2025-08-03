const { createServer } = require("http");
const { Server } = require("socket.io");
const  registerCodeExecutionSocket  = require("./sockets/codeSocket.js") ;
const User = require("./models/User.js");
const Session = require('./models/Session.js')
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

  socket.on("join-room", async (roomId) => {
  socket.join(roomId);
  console.log(`User ${socket.id} joined room ${roomId}`);

  try {
    // Try to find the session
    let session = await Session.findOne({ roomId });

    if (!session) {
      // Create new session if not found
      session = await Session.create({ roomId, participants: [socket.id] });
      console.log("New session created");
    } else {
      // Add user if not already present
      if (!session.participants.includes(socket.id)) {
        session.participants.push(socket.id);
        await session.save();
        console.log("previous data loaded");
      }
    }

    // Emit session data to the client
    socket.emit("load-session", session);
    console.log("Date emmitted");
  } catch (err) {
    console.error("❌ Failed to handle join-room:", err.message);
    socket.emit("error", "Failed to join room");
  }
});
 
  

  socket.on("join-voice", (peerId, roomId) => {
  socket.peerId = peerId;
  socket.roomId = roomId;
  socket.join(roomId); // ✅ Join the voice room
  console.log(`🎙 Peer ${peerId} joined voice room ${roomId}`);
  socket.to(roomId).emit("user-joined-voice", peerId);
});


  socket.on("send-message", ({ roomId, username, message }) => {
  const chatMessage = {
    username,
    message,
    timestamp: new Date()
  };
  socket.to(roomId).emit("receive-message", chatMessage);
});



  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-update", code);
  });

  registerCodeExecutionSocket(io, socket);

  socket.on("disconnect", () => {
   if (socket.roomId && socket.peerId) {
    socket.to(socket.roomId).emit("user-left-voice", socket.peerId);
  }
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
