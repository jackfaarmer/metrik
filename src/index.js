import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import homeRoutes from "./routes/home.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Setup __dirname (ESM safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <– for form POSTs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/auth", authRoutes);
app.use("/home", homeRoutes);

// Landing page (login/signup page)
app.get("/", (req, res) => {
  res.render("index"); 
});

app.listen(port, () => {
  console.log(`Metrik server running at http://localhost:${port}`);
});
