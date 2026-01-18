import Event from "../models/Event.js";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * =========================================================
 * ADMIN: EVENT MODERATION
 * =========================================================
 */

/**
 * @desc    Get all events (pending, approved, rejected)
 * @route   GET /api/admin/events
 * @access  Admin
 */
export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json(
      new ApiResponse(200, events, "All events fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Approve an event
 * @route   PATCH /api/admin/events/:id/approve
 * @access  Admin
 */
export const approveEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    if (event.status === "approved") {
      throw new ApiError(400, "Event is already approved");
    }

    event.status = "approved";
    event.approvedAt = new Date();
    event.approvedBy = req.user._id;

    await event.save();

    return res.status(200).json(
      new ApiResponse(200, event, "Event approved successfully")
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reject an event
 * @route   PATCH /api/admin/events/:id/reject
 * @access  Admin
 */
export const rejectEvent = async (req, res, next) => {
  try {
    const { reason } = req.body;

    if (!reason || reason.trim() === "") {
      throw new ApiError(400, "Rejection reason is required");
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    if (event.status === "rejected") {
      throw new ApiError(400, "Event is already rejected");
    }

    event.status = "rejected";
    event.rejectionReason = reason;
    event.rejectedAt = new Date();
    event.rejectedBy = req.user._id;

    await event.save();

    return res.status(200).json(
      new ApiResponse(200, event, "Event rejected successfully")
    );
  } catch (error) {
    next(error);
  }
};

/**
 * =========================================================
 * ADMIN: ORGANIZER MANAGEMENT (OPTIONAL EXTENSION)
 * =========================================================
 */

/**
 * @desc    Get all organizers
 * @route   GET /api/admin/organizers
 * @access  Admin
 */
export const getAllOrganizers = async (req, res, next) => {
  try {
    const organizers = await User.find({ role: "organizer" })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json(
      new ApiResponse(200, organizers, "Organizers fetched successfully")
    );
  } catch (error) {
    next(error);
  }
};
