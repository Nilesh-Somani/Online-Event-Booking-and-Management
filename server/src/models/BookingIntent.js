import mongoose from "mongoose";

const bookingIntentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    ticket: {
        name: String,
        price: Number,
        quantity: Number,
    },
    attendee: Object,
    attendanceMode: {
        type: String,
        enum: ["physical", "online"],
        required: true,
    },

    razorpayOrderId: String,

    status: {
        type: String,
        enum: ["created", "paid", "booking_created"],
        default: "created",
    },
}, { timestamps: true });

export default mongoose.model("BookingIntent", bookingIntentSchema);