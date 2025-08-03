const axios = require("axios");
require("dotenv").config({ path: "../.env" });
const Session = require("../models/Session")
const JUDGE0_URL =
  "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

  


const headers = {
  "Content-Type": "application/json",
  "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};

const registerCodeExecutionSocket = (io, socket) => {
  socket.on("run-code", async ({ code, languageId,stdin, roomId }) => {
    console.log("✅ Received 'run-code' event:", { roomId, languageId });
    try {
        
      const response = await axios.post(
        JUDGE0_URL,
        {
          source_code: code,
          language_id: languageId,
          stdin: stdin || "",
        },
        { headers }
      );

      const { stdout, stderr, status, time,memory } = response.data;
      const finalOutput = stdout || stderr || status.description || "No output";
      console.log("✅ Judge0 response:", response.data);
      // Broadcast output to everyone in room
      io.to(roomId).emit("code-output", { output: finalOutput,time,memory });

      console.log("✅ Emitting 'code-output' to room:", roomId, "with output:", finalOutput)

      await Session.findOneAndUpdate(
  { roomId },
  {
    code,
    stdin,
    output: finalOutput,
    languageId,
    time,
    memory,
    updatedAt: new Date()
  },
  { new: true }
);

    } catch (error) {
    //   console.error("Judge0 Error:", error.message);
      console.error("Judge0 Error:", error.response?.data || error.message);
      io.to(roomId).emit("code-output", { output: "Execution failed.",time:null,memory:null });
    }
  });
};


module.exports = registerCodeExecutionSocket;
