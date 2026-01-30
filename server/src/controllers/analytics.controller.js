import AnalyticsSnapshot from "../models/AnalyticsSnapshot.js";
import { buildAnalyticsSnapshot } from "../services/analytics.service.js";

export const getAnalytics = async (req, res) => {
    const { timeFrame = "7d" } = req.query;
    const { user } = req;

    const role = user.role;

    let snapshot = await AnalyticsSnapshot.findOne({
        owner: user._id,
        role,
        timeFrame
    });

    const shouldRebuild =
        !snapshot ||
        Date.now() - new Date(snapshot.lastCalculatedAt).getTime() > 5 * 60 * 1000;

    if (shouldRebuild) {
        const metrics = await buildAnalyticsSnapshot({ user, role, timeFrame });

        snapshot = await AnalyticsSnapshot.findOneAndUpdate(
            { owner: user._id, role, timeFrame },
            {
                role,
                owner: user._id,
                timeFrame,
                metrics,
                lastCalculatedAt: new Date()
            },
            { upsert: true, new: true }
        );
    }

    res.json(snapshot);
};