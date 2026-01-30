import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import eventsReducer from "./events/eventsSlice";
import eventFiltersReducer from "./events/eventFiltersSlice";
import eventDraftReducer from "./events/eventDraftSlice";
import venueReducer from "./venue/venueSlice";
import notificationsReducer from "./notifications/notificationsSlice";
import analyticsReducer from "./analytics/analyticsSlice";
import categoryReducer from "./category/categorySlice"
import bookingReducer from "./booking/bookingSlice"
import paymentReducer from "./payment/paymentSlice"
// import errorReducer from "./error/errorSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer,
        eventFilters: eventFiltersReducer,
        eventDraft: eventDraftReducer,
        venues: venueReducer,
        notifications: notificationsReducer,
        analytics: analyticsReducer,
        categories: categoryReducer,
        booking: bookingReducer,
        payment: paymentReducer,
        // errors: errorReducer
    },
});