import Booking from "../models/Booking.js";
import path from "path";
import fs from "fs";

/* USER BOOKINGS */
export const getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate("event", "title date location")
        .sort({ createdAt: -1 });

    res.json(bookings);
};

/* ORGANIZER BOOKINGS */
export const getOrganizerBookings = async (req, res) => {
    const bookings = await Booking.find({ organizer: req.user._id })
        .populate("event", "title date")
        .sort({ createdAt: -1 });

    res.json(bookings);
};

/* ADMIN */
export const getAllBookings = async (req, res) => {
    const bookings = await Booking.find()
        .populate("event user organizer")
        .sort({ createdAt: -1 });

    res.json(bookings);
};

export const downloadTicket = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.sendStatus(404);

    if (
        booking.user.toString() !== req.user._id.toString() &&
        booking.organizer.toString() === req.user._id.toString()
    ) {
        return res.sendStatus(403);
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=ticket-${booking._id}.pdf`
    );

    const stream = fs.createReadStream(
        path.join(process.cwd(), booking.ticketPdf)
    );

    stream.pipe(res);
};