import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import eventsReducer from "./events/eventsSlice";
import bookingsReducer from "./bookings/bookingsSlice"
import notificationsReducer from "./notifications/notificationsSlice";
import analyticsReducer from "./analytics/analyticsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer,
        bookings: bookingsReducer,
        notifications: notificationsReducer,
        analytics: analyticsReducer,
    },
});