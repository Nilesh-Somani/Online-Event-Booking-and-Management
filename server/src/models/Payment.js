import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    amount: Number, // in paise
    currency: { type: String, default: "INR" },

    status: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created"
    },

    paymentMethod: {
        type: String,
        enum: ["card", "upi", "netbanking", "wallet"]
    },

}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);