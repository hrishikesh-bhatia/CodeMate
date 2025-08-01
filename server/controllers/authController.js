const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: "../.env" });

const users = []; // In-memory (for MVP only)

const JWT_SECRET = process.env.JWT_SECRET ;

  const signup = async (req, res) => {
  const { username, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword, role };

  users.push(user);

  const token = jwt.sign({ username, role }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ token, role });
};

  const login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ username, role: user.role }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ token, role: user.role });
};

module.exports = {login,signup};
