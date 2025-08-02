const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Make sure this path is correct
require("dotenv").config({ path: "../.env" });

const JWT_SECRET = process.env.JWT_SECRET;

// 🔐 Signup Controller
const signup = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ username, role }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ token, role });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
};

// 🔓 Login Controller
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user in DB
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ username, role: user.role }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { signup, login };
