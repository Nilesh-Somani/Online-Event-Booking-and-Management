import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
    const event = await Event.create({ ...req.body, organizer: req.user.id });
    res.status(201).json(event);
};

export const getApprovedEvents = async (req, res) => {
    const events = await Event.find({ status: "approved" });
    res.json(events);
};