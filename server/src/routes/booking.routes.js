import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";
import { getMyBookings, getOrganizerBookings, getAllBookings, downloadTicket, } from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/me", protect, authorize("user"), getMyBookings);
router.get("/organizer", protect, authorize("organizer"), getOrganizerBookings);
router.get("/admin", protect, authorize("admin"), getAllBookings);
router.get("/:id/ticket", protect, downloadTicket);

export default router;