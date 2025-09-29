import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const usersFile = new URL("../users.json", import.meta.url).pathname;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // put in .env in real setup

// Signup
export async function signup(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing fields" });

  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ message: "User created successfully" });
}

// Login
export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing fields" });

  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
}
