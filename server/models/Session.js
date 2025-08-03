// models/Session.js
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  code: { type: String, default: "" },
  stdin: { type: String, default: "" },
  languageId: { type: Number, default: 63 }, // e.g., 63 = JavaScript
  output: { type: String, default: "" },
  time: { type: String, default: "" },
  memory: { type: String, default: "" },
  participants: [String], // optional
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Session", sessionSchema);
