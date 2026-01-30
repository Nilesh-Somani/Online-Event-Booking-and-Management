import mongoose from "mongoose";

const physicalLocationSchema = new mongoose.Schema(
    {
        venueSnapshot: {
            name: { type: String },
            address: { type: String },
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
        platform: String,
        joinUrl: String,
        accessNotes: String,
    },
    { _id: false }
);

const eventDraftSchema = new mongoose.Schema(
    {
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        // ===== BASIC INFO =====
        title: { type: String, trim: true },
        description: { type: String },

        // ===== CLASSIFICATION =====
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
        tags: [{ type: String }],
        eventType: {
            type: String,
            enum: ["public", "private"],
            default: "public",
        },

        // ===== DATE & TIME =====
        date: { type: Date },
        startTime: { type: String },
        durationHours: { type: Number },

        // ===== LOCATION =====
        location: {
            mode: {
                type: String,
                enum: ["physical", "online", "hybrid"],
                default: "physical",
            },
            physical: physicalLocationSchema,
            online: onlineLocationSchema,
        },

        // ===== MEDIA =====
        images: {
            card: {
                url: String,
                publicId: String,
            },
            cover: {
                url: String,
                publicId: String,
            },
            gallery: [
                {
                    url: String,
                    publicId: String,
                },
            ],
        },

        // ===== TICKETS =====
        tickets: [
            {
                name: String,
                price: Number,
                quantity: Number,
            },
        ],

        capacity: { type: Number },
        allowWaitList: { type: Boolean, default: false },

        // ===== CONTENT =====
        highlights: [{ type: String }],
        schedule: [
            {
                time: String,
                title: String,
                description: String,
            },
        ],
        policies: {
            refund: String,
            ageLimit: String,
            entry: String,
        },

        // ===== META =====
        lastStep: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("EventDraft", eventDraftSchema);