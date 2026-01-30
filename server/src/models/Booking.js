import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    ticket: {
        name: String,
        price: Number,
        quantity: Number,
    },

    attendee: {
        first_name: String,
        last_name: String,
        email: String,
        phone: String,
        billing_address: String,
        city: String,
        state: String,
        zip_code: String,
    },

    attendanceMode: {
        type: String,
        enum: ["physical", "online"],
        required: true,
    },

    amountPaid: Number,

    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
    },

    qrCode: String,     // base64 or stored file
    ticketPdf: String, // stored PDF path

    status: {
        type: String,
        enum: ["confirmed", "cancelled", "refunded"],
        default: "confirmed",
    },

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);