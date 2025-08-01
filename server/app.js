const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const codeRoutes = require("./routes/codeRoutes.js");
const authRoutes = require("./routes/authRoutes.js");



dotenv.config({ path: "../.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/code", codeRoutes);

// Placeholder route
app.get("/", (req, res) => {
  res.send("CodeMate backend running!");
});

module.exports = app;
