import mongoose from "mongoose";

const errorLogSchema = new mongoose.Schema(
    {
        message: { type: String, required: true },

        statusCode: { type: Number },

        stack: { type: String },

        route: { type: String },              // req.originalUrl
        method: { type: String },             // GET / POST
        controller: { type: String },          // manually tagged
        service: { type: String },             // eg: "venue.create"

        user: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            role: { type: String },
            email: { type: String },
        },

        request: {
            body: { type: Object },
            params: { type: Object },
            query: { type: Object },
        },

        environment: {
            type: String,
            enum: ["development", "staging", "production"],
            default: process.env.NODE_ENV,
        },

        isResolved: { type: Boolean, default: false },
        resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        resolvedAt: { type: Date },

    },
    { timestamps: true }
);

export default mongoose.model("ErrorLog", errorLogSchema);