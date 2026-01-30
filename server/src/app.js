import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import eventDraftRoutes from "./routes/eventDraft.routes.js";
import venueRoutes from "./routes/venue.routes.js";
import categoryRoutes from "./routes/category.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import bookingRoutes from "./routes/booking.routes.js"

const app = express();

/* ---------- CORS CONFIG ---------- */
app.use(
    cors({
        origin: process.env.FRONTEND_URL, // frontend URL
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.options("*", cors());

/* ---------- BODY PARSER ---------- */
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/event-draft", eventDraftRoutes);
app.use("/api/venues", venueRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/payments", paymentRoutes)
app.use("/api/bookings", bookingRoutes)

app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
    }
    next(err);
});

export default app;