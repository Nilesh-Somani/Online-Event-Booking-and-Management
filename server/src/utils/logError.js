import ErrorLog from "../models/ErrorLog.js";

export const logError = async (err, req, meta = {}) => {
    try {
        await ErrorLog.create({
            message: err.message,
            statusCode: err.statusCode || 500,
            stack: err.stack,

            route: req?.originalUrl,
            method: req?.method,

            controller: meta.controller,
            service: meta.service,

            user: req?.user ? {
                id: req.user._id,
                role: req.user.role,
                email: req.user.email,
            } : undefined,

            request: {
                body: sanitize(req.body),
                params: req.params,
                query: req.query,
            },
        });
    } catch (e) {
        // NEVER throw from here
        console.error("Error logging failed:", e.message);
    }
};

const sanitize = (body = {}) => {
    const clone = { ...body };
    delete clone.password;
    delete clone.token;
    return clone;
};