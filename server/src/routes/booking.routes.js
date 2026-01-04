import express from "express";
import { createBooking, getMyBookings } from "../controllers/booking.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/", protect, createBooking);
router.get("/me", protect, getMyBookings);

export default router;