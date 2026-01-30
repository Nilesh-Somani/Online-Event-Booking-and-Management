import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        var user = await User.findById(decoded.id).select(
            "role profile"
        );

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.role === "organizer") {
            user = await User.findById(decoded.id).select("role profile organizerProfile");
        }

        req.user = user; // ✅ FULL USER
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};