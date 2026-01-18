import express from "express";
import {
    getAllEvents,
    approveEvent,
    rejectEvent,
    getAllOrganizers,
} from "../controllers/admin.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * =========================================================
 * ADMIN ACCESS CONTROL
 * =========================================================
 * All routes below require:
 *  - Authenticated user
 *  - Admin role
 */
router.use(protect);
router.use(authorize("admin"));

/**
 * =========================================================
 * EVENT MODERATION ROUTES
 * =========================================================
 */

/**
 * Get all events (pending / approved / rejected)
 */
router.get("/events", getAllEvents);

/**
 * Approve an event
 */
router.patch("/events/:id/approve", approveEvent);

/**
 * Reject an event
 */
router.patch("/events/:id/reject", rejectEvent);

/**
 * =========================================================
 * ORGANIZER MANAGEMENT ROUTES
 * =========================================================
 */

/**
 * Get all organizers
 */
router.get("/organizers", getAllOrganizers);

export default router;