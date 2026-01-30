import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        label: String, // Home, Office
        line1: String,
        city: String,
        state: String,
        zip: String,
        country: String,
        isDefault: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("Address", addressSchema);