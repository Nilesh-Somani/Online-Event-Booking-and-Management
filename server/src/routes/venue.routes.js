import express from "express";
import { createVenue, getMyVenues, updateVenue } from "../controllers/venue.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createVenue);
router.get("/mine", protect, getMyVenues);
router.put("/venues/:id", protect, updateVenue);

export default router;