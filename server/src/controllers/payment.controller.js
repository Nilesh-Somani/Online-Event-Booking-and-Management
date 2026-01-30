import crypto from "crypto";
import QRCode from "qrcode";
import { razorpay } from "../config/razorpay.js";
import Payment from "../models/Payment.js";
import BookingIntent from "../models/BookingIntent.js";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import OrganizerPayout from "../models/OrganizerPayout.js";
import { generateTicketPdf } from "../utils/generateTicketPdf.js";

/* =========================================
   CREATE ORDER
========================================= */
export const createOrder = async (req, res) => {
    try {
        const { eventId, ticketName, quantity, attendee, attendanceMode="physical" } = req.body;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const ticket = event.tickets.find(t => t.name === ticketName);
        if (!ticket) return res.status(400).json({ message: "Invalid ticket" });

        const base = ticket.price * quantity;
        const total = Math.round((base * 1.18) * 100);

        const order = await razorpay.orders.create({
            amount: total,
            currency: "INR",
            receipt: crypto.randomBytes(8).toString("hex"),
        });

        await Payment.create({
            user: req.user._id,
            event: eventId,
            organizer: event.organizer,
            razorpayOrderId: order.id,
            amount: total,
            status: "created",
        });

        await BookingIntent.create({
            user: req.user._id,
            event: eventId,
            organizer: event.organizer,
            ticket,
            attendee,
            attendanceMode,
            razorpayOrderId: order.id,
        });

        res.json({ orderId: order.id, amount: total });
    } catch (error) {
        console.error("Create Order Error:", error);
        return res.status(500).json({
            message: "Create Order failed",
        });
    }
};

/* =========================================
   VERIFY PAYMENT + CREATE BOOKING
========================================= */
export const verifyPayment = async (req, res) => {
    try {
        if (!process.env.RAZORPAY_KEY_SECRET) {
            console.error("RAZORPAY_KEY_SECRET missing");
            return res.status(500).json({ message: "Payment configuration error" });
        }
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expected = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest("hex");

        if (expected !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed" });
        }

        const payment = await Payment.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            { status: "paid", razorpayPaymentId: razorpay_payment_id },
            { new: true }
        );

        const intent = await BookingIntent.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (!intent) {
            return res.status(400).json({ message: "Booking intent not found" });
        }

        if (intent.status === "booking_created") {
            const booking = await Booking.findOne({ payment: payment._id });
            return res.json({ booking });
        }

        const booking = await Booking.create({
            user: intent.user,
            event: intent.event,
            organizer: intent.organizer,
            ticket: intent.ticket,
            attendee: intent.attendee,
            attendanceMode: intent.attendanceMode,
            payment: payment._id,
            amountPaid: payment.amount / 100,
        });

        intent.status = "booking_created";
        await intent.save();

        if (booking.attendanceMode === "physical") {
            /* QR CODE (BOOKING ID IS REAL NOW) */
            const qrCode = await QRCode.toDataURL(
                JSON.stringify({
                    bookingId: booking._id,
                    event: booking.event,
                    user: booking.user,
                })
            );
            booking.qrCode = qrCode;

            const event = await Event.findById(booking.event);
            const pdfPath = await generateTicketPdf(booking, event);
            booking.ticketPdf = pdfPath;

            await booking.save();
        }

        triggerOrganizerPayout(payment, booking).catch(console.error);
        res.json({ booking });
    } catch (error) {
        console.error("Verify Payment Error:", error);
        return res.status(500).json({
            message: "Payment verification failed",
        });
    }
};

export const razorpayWebhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];
    const expected = crypto
        .createHmac("sha256", secret)
        .update(req.body)
        .digest("hex");

    if (signature !== expected) return res.sendStatus(400);

    const payload = JSON.parse(req.body.toString());

    if (payload.event === "payment.captured") {
        const orderId = payload.payload.payment.entity.order_id;

        const payment = await Payment.findOne({ razorpayOrderId: orderId });
        if (!payment || payment.status === "paid") return res.sendStatus(200);

        payment.status = "paid";
        await payment.save();

        // optional: auto-create booking if frontend died
    }

    res.sendStatus(200);
};

/* =========================================
   ORGANIZER PAYOUT
========================================= */
const triggerOrganizerPayout = async (payment, booking) => {
    const payout = await OrganizerPayout.findOne({
        organizer: booking.organizer,
        status: "verified",
    });

    if (!payout?.razorpayAccountId) return;

    await razorpay.transfers.create({
        account: payout.razorpayAccountId,
        amount: Math.floor(payment.amount * 0.9), // platform keeps 10%
        currency: "INR",
        notes: {
            bookingId: booking._id.toString(),
        },
    });
};