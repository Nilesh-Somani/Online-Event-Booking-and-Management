import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

/**
 * =========================================================
 * ASYNC THUNKS
 * =========================================================
 */

/**
 * Fetch approved public events (Events.jsx)
 */
export const fetchEvents = createAsyncThunk(
    "events/fetchEvents",
    async (params = {}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/events", { params });
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch events"
            );
        }
    }
);

/**
 * Fetch single event details (EventDetails.jsx)
 */
export const fetchEventById = createAsyncThunk(
    "events/fetchEventById",
    async (eventId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/events/${eventId}`);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch event details"
            );
        }
    }
);

/**
 * Fetch organizer's own events (Dashboard)
 */
export const fetchMyEvents = createAsyncThunk(
    "events/fetchMyEvents",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/events/my/events");
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch organizer events"
            );
        }
    }
);

/**
 * Create new event (CreateEvent.jsx)
 */
export const createEvent = createAsyncThunk(
    "events/createEvent",
    async (eventData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/events", eventData);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create event"
            );
        }
    }
);

/**
 * Update event (Organizer edit)
 */
export const updateEvent = createAsyncThunk(
    "events/updateEvent",
    async ({ eventId, updates }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/events/${eventId}`, updates);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update event"
            );
        }
    }
);

/**
 * Delete event (soft delete)
 */
export const deleteEvent = createAsyncThunk(
    "events/deleteEvent",
    async (eventId, { rejectWithValue }) => {
        try {
            await axios.delete(`/events/${eventId}`);
            return eventId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete event"
            );
        }
    }
);

/**
 * =========================================================
 * SLICE
 * =========================================================
 */

const initialState = {
    events: [],          // Public & organizer lists
    myEvents: [],        // Organizer dashboard
    selectedEvent: null, // EventDetails.jsx

    loading: false,
    error: null,

    total: 0,            // For pagination / analytics
};

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        clearSelectedEvent(state) {
            state.selectedEvent = null;
        },
        clearEventsError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            /* ================= FETCH EVENTS ================= */
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;

                const payload = action.payload || {};
                state.events = Array.isArray(payload.data) ? payload.data : [];
                state.total = payload.pagination?.total ?? state.events.length;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ================= FETCH EVENT DETAILS ================= */
            .addCase(fetchEventById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedEvent = action.payload;
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ================= FETCH MY EVENTS ================= */
            .addCase(fetchMyEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.myEvents = action.payload;
            })
            .addCase(fetchMyEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ================= CREATE EVENT ================= */
            .addCase(createEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.myEvents.unshift(action.payload);
            })
            .addCase(createEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ================= UPDATE EVENT ================= */
            .addCase(updateEvent.fulfilled, (state, action) => {
                const updated = action.payload;

                state.events = state.events.map((e) =>
                    e._id === updated._id ? updated : e
                );

                state.myEvents = state.myEvents.map((e) =>
                    e._id === updated._id ? updated : e
                );

                if (state.selectedEvent?._id === updated._id) {
                    state.selectedEvent = updated;
                }
            })

            /* ================= DELETE EVENT ================= */
            .addCase(deleteEvent.fulfilled, (state, action) => {
                const id = action.payload;
                state.events = state.events.filter((e) => e._id !== id);
                state.myEvents = state.myEvents.filter((e) => e._id !== id);
            });
    },
});

export const {
    clearSelectedEvent,
    clearEventsError,
} = eventsSlice.actions;

export default eventsSlice.reducer;