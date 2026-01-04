import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    date: Date,
    location: String,
    price: Number,
    totalSeats: Number,
    availableSeats: Number,
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);