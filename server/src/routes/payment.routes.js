import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";
import { createOrder, verifyPayment, razorpayWebhook } from "../controllers/payment.controller.js";

const router = express.Router();

router.post(
    "/create-order",
    protect,
    authorize("user"),
    createOrder
);

router.post(
    "/verify",
    protect,
    authorize("user"),
    verifyPayment
);

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    razorpayWebhook
);

export default router;