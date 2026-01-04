import mongoose from "mongoose";

/* ---------- COMMON PROFILE (ALL ROLES) ---------- */
const profileSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        middleName: String,
        lastName: { type: String, required: true },
        phone: String,
        avatar: String,
        bio: String,
    },
    { _id: false }
);

/* ---------- ORGANIZER PROFILE ---------- */
const organizerProfileSchema = new mongoose.Schema(
    {
        personalInfo: {
            dateOfBirth: Date,
        },

        businessInfo: {
            businessName: String,
            businessType: String,
            address: String,
            phone: String,
            email: String,
            website: String,
        },

        venueInfo: {
            name: String,
            type: String,
            address: String,
            capacity: Number,
            costPerDay: Number,
            description: String,
            photos: [String],
        },

        eventTypes: [String],
        experience: String,

        documents: {
            license: String,
            insurance: String,
            identity: String,
        },

        isCompleted: { type: Boolean, default: false },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { _id: false }
);

/* ---------- USER SCHEMA ---------- */
const userSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, required: true },
        userId: { type: String, unique: true, required: true },
        password: { type: String, required: true },

        role: {
            type: String,
            enum: ["user", "organizer", "admin"],
            default: "user",
        },

        profileStatus: {
            type: String,
            enum: ["incomplete", "completed"],
            default: "incomplete",
        },

        profile: {
            type: profileSchema,
            required: true,
        },

        organizerProfile: {
            type: organizerProfileSchema,
            required: function () {
                return this.role === "organizer";
            },
        },

        settings: {
            notifications: {
                email: { type: Boolean, default: true },
                sms: { type: Boolean, default: false },
                marketing: { type: Boolean, default: false },
            },
            preferences: {
                language: { type: String, default: "en" },
                currency: { type: String, default: "USD" },
                timezone: String,
            },
        },

        security: {
            twoFactorEnabled: { type: Boolean, default: false },
            accountDeleted: { type: Boolean, default: false },
            deletedAt: Date,
        },
    },
    { timestamps: true }
);

/* ---------- CLEANUP ---------- */
userSchema.pre("save", function (next) {
    if (this.role !== "organizer") {
        this.organizerProfile = undefined;
    }
    next();
});

export default mongoose.model("User", userSchema);