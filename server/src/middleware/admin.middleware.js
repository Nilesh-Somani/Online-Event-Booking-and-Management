/**
 * Admin Authorization Middleware
 * --------------------------------
 * Allows access ONLY to users with role === "admin"
 * Must be used AFTER authentication middleware
 */

export const adminOnly = (req, res, next) => {
    try {
        // Auth middleware must attach req.user
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Authentication required",
            });
        }

        // Enforce admin role
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Admin access only",
            });
        }

        next();
    } catch (error) {
        console.error("Admin Middleware Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error (admin middleware)",
        });
    }
};