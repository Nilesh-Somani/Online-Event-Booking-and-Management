import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

/**
 * Fetch my venues
 */
export const fetchMyVenues = createAsyncThunk(
    "venues/fetchMyVenues",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/venues/mine");
            return data; // MUST be array
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

/**
 * Create venue
 */
export const createVenue = createAsyncThunk(
    "venues/createVenue",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/venues", payload);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const venueSlice = createSlice({
    name: "venues",
    initialState: {
        venues: [],        // ✅ MUST be array
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // -------- FETCH --------
            .addCase(fetchMyVenues.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyVenues.fulfilled, (state, action) => {
                state.loading = false;
                state.venues = Array.isArray(action.payload)
                    ? action.payload
                    : []; // ✅ hard safety
            })
            .addCase(fetchMyVenues.rejected, (state, action) => {
                state.loading = false;
                state.venues = [];
                state.error = action.payload;
            })

            // -------- CREATE --------
            .addCase(createVenue.fulfilled, (state, action) => {
                const v = action.payload.venue;

                if (!state.venues.find(x => x._id === v._id)) {
                    state.venues.unshift(v);
                }
            })
    },
});

export default venueSlice.reducer;