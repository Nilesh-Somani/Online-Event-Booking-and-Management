import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

/* ---------- CORS CONFIG ---------- */
app.use(
    cors({
        origin: "http://localhost:5173", // frontend URL
        credentials: true,
    })
);

/* ---------- BODY PARSER ---------- */
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

export default app;