import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import homeRoutes from "./routes/home.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/home", homeRoutes);

app.listen(port, () => {
  console.log(`Metrik server running at http://localhost:${port}`);
});
