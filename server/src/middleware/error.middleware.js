import { logError } from "../utils/logError.js";

export const errorHandler = async (err, req, res, next) => {
    if (err.statusCode >= 500 || err.log === true) {
        await logError(err, req, {
            controller: err.controller,
            service: err.service,
        });
    }

    res.status(err.statusCode || 500).json({
        message: err.message || "Server Error",
    });
};