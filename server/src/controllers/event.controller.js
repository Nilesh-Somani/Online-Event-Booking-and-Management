import Category from "../models/Category.js"
import Event from "../models/Event.js";
import { geocodeLocation } from "../services/geocoding.service.js";

/**
 * =========================================================
 * CREATE EVENT (Organizer only)
 * Status will always be "pending" initially
 * =========================================================
 */
export const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            categories,
            tags,
            eventType,
            date,
            startTime,
            durationHours,
            location,
            images,
            tickets,
            capacity,
            allowWaitList,
            highlights,
            schedule,
            policies,
        } = req.body;

        // Mandatory image validation
        if (!images?.cover || !images?.card) {
            return res.status(400).json({
                message: "Cover image and card image are mandatory",
            });
        }

        // Ticket validation
        if (!tickets || tickets.length === 0) {
            return res.status(400).json({
                message: "At least one ticket type is required",
            });
        }

        let coordinates = null;

        if (location?.mode !== "online" && location?.physical?.venueSnapshot) {
            const geoResult = await geocodeLocation(location.physical.venueSnapshot);
            coordinates = geoResult.coordinates;
        }

        const event = await Event.create({
            title,
            description,
            categories,
            tags,
            eventType,
            date,
            startTime,
            durationHours,
            location: {
                ...location,
                physical: location?.physical
                    ? {
                        ...location.physical,
                        venueSnapshot: {
                            ...location.physical.venueSnapshot,
                            coordinates,
                        },
                    }
                    : undefined,
            },
            images,
            tickets,
            capacity,
            allowWaitList,
            highlights,
            schedule,
            policies,
            organizer: req.user._id,
            organizerSnapshot: {
                name: `${req.user.profile.firstName} ${req.user.profile.lastName}`,
                bio: req.user.profile.bio,
                website: req.user.organizerProfile.businessInfo.website,
            },
        });

        res.status(201).json({
            message: "Event created successfully and sent for admin approval",
            event,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create event",
            error: error.message,
        });
    }
};

/**
 * =========================================================
 * GET ALL APPROVED PUBLIC EVENTS (Events Page)
 * Supports search, category, location & sorting
 * =========================================================
 */
export const getApprovedEvents = async (req, res) => {
    try {
        let {
            search,
            dateFrom,
            dateTo,
            category,
            location,
            order = "asc",
            page = 1,
            limit = 12,
        } = req.query;

        // 🔒 HARD SANITIZATION
        search = typeof search === "string" ? search.trim() : "";
        location = typeof location === "string" ? location.trim() : "";

        const query = {
            approvalStatus: "approved",
            eventType: "public",
        };

        if (search !== "") {
            query.$text = { $search: search };
        }

        if (dateFrom || dateTo) {
            query.date = {};
            if (dateFrom) query.date.$gte = new Date(dateFrom);
            if (dateTo) query.date.$lte = new Date(dateTo);
        }

        if (category) {
            const cat = await Category.findOne({ slug: category }).select("_id");
            if (cat) {
                query.categories = cat._id;
            }
        }

        if (location !== "") {
            query["location.physical.venueSnapshot.city"] = {
                $regex: location,
                $options: "i",
            };
        }

        const sort = {
            date: order === "desc" ? -1 : 1,
        };

        const events = await Event.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .select("-rejectionMessage -isDeleted")
            .populate("categories", "name slug")
            .populate("organizer", "profile.firstName profile.lastName")

        const total = await Event.countDocuments(query);

        res.json({
            data: events,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch events",
            error: error.message,
        });
    }
};

export const getBaseEventFilters = async (req, res) => {
    const events = await Event.find({
        approvalStatus: "approved",
        eventType: "public",
    })
        .select("location categories")
        .populate("categories", "name slug");

    res.json({
        locations: [...new Set(events.map(e => e.location.physical.venueSnapshot.city).filter(Boolean))],
        categories: [
            ...new Map(
                events.flatMap(e => e.categories).map(c => [c.slug, c])
            ).values(),
        ],
    });
};

export const getDependentEventFilters = async (req, res) => {
    const { category, location, search } = req.query;

    const baseQuery = {
        approvalStatus: "approved",
        eventType: "public",
    };

    if (search) baseQuery.$text = { $search: search };

    let categories = [];
    let locations = [];

    // Category selected → update locations only
    if (category) {
        const cat = await Category.findOne({ slug: category }).select("_id");
        if (cat) {
            const events = await Event.find({
                ...baseQuery,
                categories: cat._id,
            }).select("location");

            locations = [...new Set(events.map(e => e.location.physical.venueSnapshot.city))];
        }
    }

    // Location selected → update categories only
    if (location) {
        const events = await Event.find({
            ...baseQuery,
            "location.physical.venueSnapshot.city": {
                $regex: location,
                $options: "i",
            },
        })
            .select("categories")
            .populate("categories", "name slug");

        categories = [
            ...new Map(
                events.flatMap(e => e.categories).map(c => [c.slug, c])
            ).values(),
        ];
    }

    res.json({ categories, locations });
};

/**
 * =========================================================
 * GET SINGLE EVENT DETAILS (Event Details Page)
 * Public approved OR private if organizer owns it
 * =========================================================
 */
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate("organizer", "name bio website");

        if (!event || event.isDeleted) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Public approved event
        if (
            event.eventType === "public" &&
            event.approvalStatus === "approved"
        ) {
            return res.json(event);
        }

        // Private or pending event → only organizer can view
        if (req.user && event.organizer._id.toString() === req.user.id) {
            return res.json(event);
        }

        return res.status(403).json({
            message: "You are not authorized to view this event",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch event",
            error: error.message,
        });
    }
};

/**
 * =========================================================
 * GET ORGANIZER EVENTS (Dashboard)
 * Includes pending / approved / rejected
 * =========================================================
 */
export const getMyEvents = async (req, res) => {
    try {
        const events = await Event.find({
            organizer: req.user.id,
            isDeleted: false,
        }).sort({ createdAt: -1 });

        res.json(events);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch organizer events",
            error: error.message,
        });
    }
};

/**
 * =========================================================
 * UPDATE EVENT (Organizer only, not after approval)
 * =========================================================
 */
export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event || event.isDeleted) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.organizer.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (event.approvalStatus === "approved") {
            return res.status(400).json({
                message: "Approved events cannot be edited",
            });
        }

        Object.assign(event, req.body);
        await event.save();

        res.json({
            message: "Event updated successfully",
            event,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update event",
            error: error.message,
        });
    }
};

/**
 * =========================================================
 * SOFT DELETE EVENT (Organizer only)
 * =========================================================
 */
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event || event.isDeleted) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.organizer.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        event.isDeleted = true;
        await event.save();

        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete event",
            error: error.message,
        });
    }
};