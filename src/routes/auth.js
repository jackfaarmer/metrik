import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// Render-only GETs (optional if you want /auth/signup to be a page too)
router.get("/signup", (req, res) => res.render("index"));
router.get("/login", (req, res) => res.render("index"));

// Form POSTs
router.post("/signup", signup);
router.post("/login", login);

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
  });

export default router;
