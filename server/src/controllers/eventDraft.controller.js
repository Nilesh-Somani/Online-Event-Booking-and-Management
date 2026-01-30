import EventDraft from "../models/EventDraft.js";

/**
 * GET /event-draft
 * Fetch current user's draft
 */
export const getEventDraft = async (req, res, next) => {
    try {
        const draft = await EventDraft.findOne({
            organizer: req.user.id,
        });

        res.status(200).json(draft); // can be null
    } catch (err) {
        next(err);
    }
};

/**
 * POST /event-draft
 * Create or update draft (UPSERT)
 */
export const saveEventDraft = async (req, res, next) => {
    try {
        const draft = await EventDraft.findOneAndUpdate(
            { organizer: req.user.id },
            {
                ...req.body,
                organizer: req.user.id,
            },
            {
                new: true,
                upsert: true, // 🔥 creates if not exists
                setDefaultsOnInsert: true,
                runValidators: true,
            }
        );

        res.status(200).json(draft);
    } catch (err) {
        next(err);
    }
};

/**
 * DELETE /event-draft
 * Remove draft after publish
 */
export const deleteEventDraft = async (req, res, next) => {
    try {
        await EventDraft.findOneAndDelete({
            organizer: req.user.id,
        });

        res.status(200).json({ message: "Draft cleared" });
    } catch (err) {
        next(err);
    }
};