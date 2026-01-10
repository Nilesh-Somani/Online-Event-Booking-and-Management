// server/src/controllers/user.controller.js
import User from "../models/User.js";

/* ---------- GET ME ---------- */
export const getMe = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
};

/* ---------- PROFILE ---------- */
export const updateProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // console.log(User.schema.path('organizerProfile'));

    user.profile = { ...user.profile, ...req.body };
    user.profileStatus = "completed";

    await user.save();
    res.json(user);
};

/* ---------- SETTINGS ---------- */
export const updateSettings = async (req, res) => {
    const user = await User.findById(req.user._id);

    user.settings = {
        ...user.settings,
        ...req.body,
    };

    await user.save();
    res.json(user);
};

/* ---------- ORGANIZER ---------- */
export const updateOrganizerProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "organizer")
        return res.status(403).json({ message: "Not organizer" });

    user.organizerProfile = {
        ...user.organizerProfile,
        ...req.body,
    };

    await user.save();
    res.json(user);
};