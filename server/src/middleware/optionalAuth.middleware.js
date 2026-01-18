// middleware/optionalAuth.middleware.js
import jwt from "jsonwebtoken";

export const optionalAuth = (req, _res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return next();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch {
        // ignore invalid token
    }

    next();
};