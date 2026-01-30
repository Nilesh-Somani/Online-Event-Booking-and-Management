import express from "express";
import {
    getEventDraft,
    saveEventDraft,
    deleteEventDraft,
} from "../controllers/eventDraft.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect); // 🔐 all draft routes are private

router.get("/", getEventDraft);
router.post("/", saveEventDraft);
router.delete("/", deleteEventDraft);

export default router; 