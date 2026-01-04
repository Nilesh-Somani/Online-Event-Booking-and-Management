import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stats: {
        totalEvents: 0,
        totalBookings: 0,
        totalRevenue: 0,
        ticketsSold: 0,
    },
    charts: {
        bookingsByDate: [],
        revenueByDate: [],
    },
    loading: false,
    error: null,
};

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {
        setAnalytics(state, action) {
            state.stats = action.payload.stats || state.stats;
            state.charts = action.payload.charts || state.charts;
            state.loading = false;
            state.error = null;
        },
        setAnalyticsLoading(state) {
            state.loading = true;
        },
        setAnalyticsError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearAnalytics(state) {
            state.stats = initialState.stats;
            state.charts = initialState.charts;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    setAnalytics,
    setAnalyticsLoading,
    setAnalyticsError,
    clearAnalytics,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;