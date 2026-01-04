import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

export const createBooking = async (req, res) => {
    const { eventId, seats } = req.body;
    const event = await Event.findById(eventId);

    if (!event || event.availableSeats < seats)
        return res.status(400).json({ message: "Not enough seats" });

    event.availableSeats -= seats;
    await event.save();

    const booking = await Booking.create({
        user: req.user.id,
        event: eventId,
        seats,
        amountPaid: seats * event.price,
        paymentStatus: "paid",
    });

    res.status(201).json(booking);
};

export const getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id }).populate("event");
    res.json(bookings);
};