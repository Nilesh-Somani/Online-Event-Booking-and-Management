import express from "express";
import { createEvent, getApprovedEvents } from "../controllers/event.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getApprovedEvents);
router.post("/", protect, authorize("organizer"), createEvent);

export default router;