import express from "express";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authRequired, (req, res) => {
  res.json({ message: `Welcome home, ${req.user.username}! 🚀` });
});

export default router;
