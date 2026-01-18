import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import eventsReducer from "./events/eventsSlice";
import eventFiltersReducer from "./events/eventFiltersSlice";
import bookingsReducer from "./bookings/bookingsSlice"
import notificationsReducer from "./notifications/notificationsSlice";
import analyticsReducer from "./analytics/analyticsSlice";
import categoryReducer from "./category/categorySlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer,
        eventFilters: eventFiltersReducer,
        bookings: bookingsReducer,
        notifications: notificationsReducer,
        analytics: analyticsReducer,
        categories: categoryReducer,
    },
});