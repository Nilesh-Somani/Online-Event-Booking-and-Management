import Event from "../models/Event.js";
import Venue from "../models/Venue.js";
import { geocodeLocation } from "../services/geocoding.service.js";

/**
 * Create venue
 */
export const createVenue = async (req, res) => {
    const { name, address, city, state, country } = req.body;
    try {
        const geoResult = await geocodeLocation({ name, address, city, state, country, });

        const venue = await Venue.create({
            ...req.body,
            coordinates: geoResult.coordinates,
            locationAccuracy: geoResult.accuracy,
            createdBy: req.user._id,
        });

        return res.status(201).json({
            venue,
            reused: false,
        });
    } catch (err) {
        if (err.code === 11000) {
            const existingVenue = await Venue.findOne({
                name,
                address,
                city,
                state,
                country,
                createdBy: req.user._id,
                isArchived: false,
            });

            return res.status(200).json({
                venue: existingVenue,
                reused: true,
            });
        }
        return res.status(500).json(err.message);
    }
};

/**
 * Get my venues
 */
export const getMyVenues = async (req, res) => {
    try {
        const venues = await Venue.find({
            createdBy: req.user._id,
            isArchived: false,
        }).sort({ createdAt: -1 });

        res.json(venues);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const updateVenue = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);

        if (!venue) {
            return res.status(404).json({ message: "Venue not found" });
        }

        if (venue.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        Object.assign(venue, req.body);

        // 🔁 Recalculate coordinates if location fields changed
        const geoResult = await geocodeLocation({
            name: venue.name,
            address: venue.address,
            city: venue.city,
            state: venue.state,
            country: venue.country,
        });

        venue.coordinates = geoResult.coordinates;
        venue.locationAccuracy = geoResult.accuracy;

        await venue.save();

        await Event.updateMany(
            {
                "location.physical.venueId": venue._id,
                date: { $gte: new Date() },
                isDeleted: false,
            },
            {
                $set: {
                    "location.physical.venueSnapshot": {
                        name: venue.name,
                        address: venue.address,
                        city: venue.city,
                        state: venue.state,
                        country: venue.country,
                        coordinates: venue.coordinates,
                        parking: venue.parking,
                        entryNotes: venue.entryNotes,
                    },
                },
            }
        );

        res.json(venue);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update venue",
            error: error.message,
        });
    }
};