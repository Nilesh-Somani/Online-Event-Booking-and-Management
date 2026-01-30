import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

/* ---------------- CREATE ORDER ---------------- */
export const createOrder = createAsyncThunk(
    "payment/createOrder",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "/payments/create-order",
                payload
            );
            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to create order"
            );
        }
    }
);

/* ---------------- VERIFY PAYMENT ---------------- */
export const verifyPayment = createAsyncThunk(
    "payment/verify",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "/payments/verify",
                payload
            );
            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Payment verification failed"
            );
        }
    }
);

/* ---------------- SLICE ---------------- */
const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        loading: false,
        error: null,
        success: false,
        order: null,
        paymentId: null,
        lastBookingId: null,
        pendingPayment: null,
    },
    reducers: {
        resetPaymentState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                state.pendingPayment = {
                    orderId: action.payload.orderId,
                    eventId: action.meta.arg.eventId,
                    ticketName: action.meta.arg.ticketName,
                    quantity: action.meta.arg.quantity,
                };

                localStorage.setItem(
                    "pendingPayment",
                    JSON.stringify(state.pendingPayment)
                );
            })
            .addCase(verifyPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.lastBookingId = action.payload.booking._id;
                state.pendingPayment = null;
                localStorage.removeItem("pendingPayment");

                // 🔐 Persist
                localStorage.setItem(
                    "lastBookingId",
                    action.payload.booking._id
                );
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;