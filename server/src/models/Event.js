import mongoose from "mongoose";

/**
 * Sub-schemas (kept inside same file for consistency & atomicity)
 */

const imageSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        alt: { type: String, default: "" },
    },
    { _id: false }
);

const ticketSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 0 },
        sold: { type: Number, default: 0 },
    },
    { _id: false }
);

const scheduleSchema = new mongoose.Schema(
    {
        time: { type: String, required: true },
        title: { type: String, required: true },
    },
    { _id: false }
);

const physicalLocationSchema = new mongoose.Schema(
    {
        venueId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Venue",
        },

        venueSnapshot: {
            name: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String },
            state: { type: String },
            country: { type: String },
            coordinates: {
                lat: Number,
                lng: Number,
            },
            parking: String,
            entryNotes: String,
        },
    },
    { _id: false }
);

const onlineLocationSchema = new mongoose.Schema(
    {
        platform: {
            type: String, // Zoom, Google Meet, Custom
        },
        joinUrl: {
            type: String,
        },
        accessNotes: {
            type: String,
        },
    },
    { _id: false }
);

const reviewSchema = new mongoose.Schema(
    {
        name: String,
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
    },
    { _id: false }
);

const policySchema = new mongoose.Schema(
    {
        refund: { type: String },
        ageLimit: { type: String },
        entry: { type: String },
    },
    { _id: false }
);

/**
 * Main Event Schema
 */

const eventSchema = new mongoose.Schema(
    {
        /* ================= BASIC INFO ================= */
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        description: {
            type: String,
            required: true,
            maxlength: 5000,
        },

        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },
        ],

        tags: {
            type: [String],
            default: [],
        },

        eventType: {
            type: String,
            enum: ["public", "private"],
            default: "public",
        },

        /* ================= DATE & TIME ================= */
        date: {
            type: Date,
            required: true,
        },

        startTime: {
            type: String,
            required: true,
        },

        durationHours: {
            type: Number,
            min: 0,
        },

        /* ================= LOCATION ================= */
        location: {
            mode: {
                type: String,
                enum: ["physical", "online", "hybrid"],
                default: "physical",
                required: true,
            },

            physical: physicalLocationSchema,

            online: onlineLocationSchema,
        },

        /* ================= IMAGES ================= */
        images: {
            cover: {
                type: imageSchema,
                required: true, // HERO image (mandatory)
            },
            card: {
                type: imageSchema,
                required: true, // Event card image (mandatory)
            },
            gallery: {
                type: [imageSchema], // Optional extra images
                default: [],
            },
        },

        /* ================= TICKETS & CAPACITY ================= */
        tickets: {
            type: [ticketSchema],
            validate: {
                validator: (v) => v.length > 0,
                message: "At least one ticket type is required",
            },
        },

        capacity: {
            type: Number,
            min: 1,
        },

        allowWaitList: {
            type: Boolean,
            default: false,
        },

        /* ================= CONTENT ================= */
        highlights: {
            type: [String],
            default: [],
        },

        schedule: {
            type: [scheduleSchema],
            default: [],
        },

        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },

        bookingsCount: {
            type: Number,
            default: 0,
        },

        reviews: {
            type: [reviewSchema],
            default: [],
        },

        policies: policySchema,

        /* ================= ORGANIZER ================= */
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        organizerSnapshot: {
            name: String,
            bio: String,
            website: String,
        },

        /* ================= ADMIN MODERATION ================= */
        approvalStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },

        rejectionMessage: {
            type: String,
            maxlength: 500,
        },

        approvedAt: {
            type: Date,
        },

        /* ================= SYSTEM ================= */
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Indexes for performance
 */
eventSchema.index({ title: "text", description: "text" });
eventSchema.index({ date: 1, approvalStatus: 1, eventType: 1 });

export default mongoose.model("Event", eventSchema);