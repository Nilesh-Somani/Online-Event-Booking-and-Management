import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

/* ---------------- FETCH MY BOOKINGS ---------------- */
export const fetchMyBookings = createAsyncThunk(
    "booking/my",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/bookings/me");
            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch bookings"
            );
        }
    }
);

/* ---------------- FETCH MY TICKET ---------------- */
export const downloadTicket = createAsyncThunk(
    "booking/downloadTicket",
    async (bookingId, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `/bookings/${bookingId}/ticket`,
                { responseType: "blob" }
            );

            // Handle download HERE, not in Redux
            const url = window.URL.createObjectURL(res.data);
            const a = document.createElement("a");
            a.href = url;
            a.download = `ticket-${bookingId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);

            return true; // ✅ serializable
        } catch {
            return rejectWithValue("Failed to download ticket");
        }
    }
);


/* ---------------- SLICE ---------------- */
const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        bookings: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchMyBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default bookingSlice.reducer;