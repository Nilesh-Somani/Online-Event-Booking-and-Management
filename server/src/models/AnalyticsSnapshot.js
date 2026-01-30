import mongoose from "mongoose";

const analyticsSnapshotSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["user", "organizer", "admin"],
            required: true,
            index: true
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        timeFrame: {
            type: String,
            enum: ["7d", "30d", "90d", "1y"],
            default: "7d"
        },

        metrics: {
            totalRevenue: { type: Number, default: 0 },
            totalBookings: { type: Number, default: 0 },
            activeEvents: { type: Number, default: 0 },
            conversionRate: { type: Number, default: 0 },

            eventsJoined: { type: Number, default: 0 },   // USER
            eventsCreated: { type: Number, default: 0 },  // ORGANIZER
            totalUsers: { type: Number, default: 0 },     // ADMIN
            totalEvents: { type: Number, default: 0 }     // ADMIN
        },

        trends: {
            revenue: [Number],
            bookings: [Number],
            labels: [String]
        },

        topEvents: [
            {
                eventId: mongoose.Schema.Types.ObjectId,
                title: String,
                revenue: Number,
                bookings: Number
            }
        ],

        lastCalculatedAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

analyticsSnapshotSchema.index({ owner: 1, role: 1, timeFrame: 1 });

export default mongoose.model("AnalyticsSnapshot", analyticsSnapshotSchema);