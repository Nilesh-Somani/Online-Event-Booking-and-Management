import ErrorLog from "../models/ErrorLog.js";

export const getErrors = async (req, res) => {
    const { page = 1, limit = 20, resolved } = req.query;

    const filter = {};
    if (resolved !== undefined) {
        filter.isResolved = resolved === "true";
    }

    const errors = await ErrorLog.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total = await ErrorLog.countDocuments(filter);

    res.json({ errors, total });
};

export const resolveError = async (req, res) => {
    const error = await ErrorLog.findByIdAndUpdate(
        req.params.id,
        {
            isResolved: true,
            resolvedBy: req.user._id,
            resolvedAt: new Date(),
        },
        { new: true }
    );

    res.json(error);
};