import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        city: String,
        state: String,
        country: String,

        coordinates: {
            lat: Number,
            lng: Number,
        },

        locationAccuracy: {
            type: String,
            enum: ["exact", "approximate"],
            default: "approximate",
        },

        parking: String,
        entryNotes: String,

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        isArchived: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

/**
 * Prevent duplicate venues per organizer
 */
venueSchema.index(
    {
        name: 1,
        address: 1,
        createdBy: 1,
    },
    { unique: true }
);

export default mongoose.model("Venue", venueSchema);