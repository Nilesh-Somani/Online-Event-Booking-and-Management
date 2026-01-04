import express from "express";
import { login, register, logout, checkAvailability } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", protect, logout);
router.get("/check-availability", checkAvailability);

export default router;