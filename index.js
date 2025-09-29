import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Metrik 🚀" });
});

app.listen(port, () => {
  console.log(`Metrik server running at http://localhost:${port}`);
});
