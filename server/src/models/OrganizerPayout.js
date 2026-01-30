import mongoose from "mongoose";

const organizerPayoutSchema = new mongoose.Schema({
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true
    },

    razorpayAccountId: String, // acct_xxxxx
    status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending"
    },

    primaryMethod: {
        type: String,
        enum: ["bank", "upi"],
    },

    bank: {
        accountHolder: String,
        accountNumber: String,
        ifsc: String,
    },

    upi: {
        vpa: String,
    },

}, { timestamps: true });

export default mongoose.model("OrganizerPayout", organizerPayoutSchema);