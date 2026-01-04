import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],          // all bookings (role-based usage)
    loading: false,
    error: null,
};

const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setBookings(state, action) {
            state.list = action.payload;
            state.loading = false;
            state.error = null;
        },
        addBooking(state, action) {
            state.list.push(action.payload);
        },
        removeBooking(state, action) {
            state.list = state.list.filter(
                booking => booking.id !== action.payload
            );
        },
        setBookingsLoading(state) {
            state.loading = true;
        },
        setBookingsError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearBookings(state) {
            state.list = [];
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    setBookings,
    addBooking,
    removeBooking,
    setBookingsLoading,
    setBookingsError,
    clearBookings,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;