import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

/**
 * ===============================
 * BASE FILTERS
 * Loads ALL categories & locations
 * ===============================
 */
export const fetchBaseEventFilters = createAsyncThunk(
    "eventFilters/fetchBase",
    async () => {
        const { data } = await axios.get("/events/filters/base");
        return data;
    }
);

/**
 * =====================================
 * DEPENDENT FILTERS
 * Updates ONLY the opposite filter
 * =====================================
 */
export const fetchDependentEventFilters = createAsyncThunk(
    "eventFilters/fetchDependent",
    async (params) => {
        const { data } = await axios.get("/events/filters/dependent", {
            params,
        });
        return data;
    }
);

const eventFiltersSlice = createSlice({
    name: "eventFilters",
    initialState: {
        categories: [],
        locations: [],
        loading: false,
    },
    reducers: {
        resetFilters(state) {
            state.categories = [];
            state.locations = [];
        },
    },
    extraReducers: (builder) => {
        builder

            /* ---------- BASE FILTERS ---------- */
            .addCase(fetchBaseEventFilters.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBaseEventFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.categories;
                state.locations = action.payload.locations;
            })
            .addCase(fetchBaseEventFilters.rejected, (state) => {
                state.loading = false;
            })

            /* ------- DEPENDENT FILTERS -------- */
            .addCase(fetchDependentEventFilters.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDependentEventFilters.fulfilled, (state, action) => {
                state.loading = false;

                // IMPORTANT:
                // Only update what backend sends
                if (action.payload.categories?.length) {
                    state.categories = action.payload.categories;
                }

                if (action.payload.locations?.length) {
                    state.locations = action.payload.locations;
                }
            })
            .addCase(fetchDependentEventFilters.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { resetFilters } = eventFiltersSlice.actions;
export default eventFiltersSlice.reducer;