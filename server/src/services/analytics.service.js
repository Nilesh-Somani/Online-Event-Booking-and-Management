import AnalyticsSnapshot from "../models/AnalyticsSnapshot.js";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

export const buildAnalyticsSnapshot = async ({ user, role, timeFrame }) => {
    const snapshot = {
        totalRevenue: 0,
        totalBookings: 0,
        activeEvents: 0,
        conversionRate: 0,
        eventsJoined: 0,
        eventsCreated: 0,
        totalUsers: 0,
        totalEvents: 0
    };

    const now = new Date();
    const fromDate = getFromDate(timeFrame, now);

    if (role === "user") {
        const bookings = await Booking.find({
            user: user._id,
            createdAt: { $gte: fromDate }
        });

        snapshot.eventsJoined = bookings.length;
        snapshot.totalBookings = bookings.length;
    }

    if (role === "organizer") {
        const events = await Event.find({ organizer: user._id });
        const eventIds = events.map(e => e._id);

        const bookings = await Booking.find({
            event: { $in: eventIds },
            createdAt: { $gte: fromDate }
        });

        snapshot.eventsCreated = events.length;
        snapshot.totalBookings = bookings.length;
        snapshot.totalRevenue = bookings.reduce((s, b) => s + b.amount, 0);
        snapshot.activeEvents = events.filter(e => e.status === "approved").length;
    }

    if (role === "admin") {
        snapshot.totalUsers = await User.countDocuments();
        snapshot.totalEvents = await Event.countDocuments();
        snapshot.totalBookings = await Booking.countDocuments();
        snapshot.totalRevenue = await Booking.aggregate([
            { $group: { _id: null, sum: { $sum: "$amount" } } }
        ]).then(r => r[0]?.sum || 0);
    }

    return snapshot;
};

const getFromDate = (timeFrame, now) => {
    const map = {
        "7d": 7,
        "30d": 30,
        "90d": 90,
        "1y": 365
    };
    return new Date(now.setDate(now.getDate() - map[timeFrame]));
};