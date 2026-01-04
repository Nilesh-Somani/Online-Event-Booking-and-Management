import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    views: { type: Number, default: 0 },
    bookings: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Analytics", analyticsSchema);