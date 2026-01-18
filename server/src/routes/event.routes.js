import express from "express";
import {
    createEvent,
    getApprovedEvents,
    getBaseEventFilters,
    getDependentEventFilters,
    getEventById,
    getMyEvents,
    updateEvent,
    deleteEvent,
} from "../controllers/event.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { optionalAuth } from "../middleware/optionalAuth.middleware.js";

const router = express.Router();

/**
 * =========================================================
 * PUBLIC ROUTES
 * =========================================================
 */

/**
 * Get all approved public events
 * Used by:
 * - Events listing page
 * - Category filters
 * - Search & sorting
 */
router.get("/", getApprovedEvents);
router.get("/filters/base", getBaseEventFilters);
router.get("/filters/dependent", getDependentEventFilters);

/**
 * Get events created by logged-in organizer
 * Includes pending / approved / rejected
 */
router.get("/my/events", protect, authorize("organizer"), getMyEvents);

/**
 * Get single event details
 * Public → approved & public events
 * Private/Pending → organizer only (handled in controller)
 */
router.get("/:id", optionalAuth, getEventById);

/**
 * =========================================================
 * ORGANIZER ROUTES
 * =========================================================
 */

/**
 * Create new event
 * Organizer only
 */
router.post(
    "/",
    protect,
    authorize("organizer"),
    createEvent
);

/**
 * Update event (only if not approved)
 */
router.put(
    "/:id",
    protect,
    authorize("organizer"),
    updateEvent
);

/**
 * Soft delete event
 */
router.delete(
    "/:id",
    protect,
    authorize("organizer"),
    deleteEvent
);

export default router;