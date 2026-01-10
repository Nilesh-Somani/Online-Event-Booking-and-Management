// server/src/routes/user.routes.js
import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMe, updateProfile, updateSettings, updateOrganizerProfile, } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.put("/settings", protect, updateSettings);
router.put("/organizer", protect, updateOrganizerProfile);

export default router;