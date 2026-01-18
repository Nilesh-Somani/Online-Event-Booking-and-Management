import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

/* ============================================================
   Async Thunks
   ============================================================ */

/**
 * Fetch all categories
 * Supports:
 *  - [{ _id, name }]
 *  - { categories: [...] }
 */
export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/categories");

            /**
             * Supported API responses:
             * 1. { data: [...] }
             * 2. { categories: [...] }
             * 3. [...]
             */
            const categories =
                Array.isArray(response.data)
                    ? response.data
                    : Array.isArray(response.data?.data)
                        ? response.data.data
                        : Array.isArray(response.data?.categories)
                            ? response.data.categories
                            : null;

            if (!categories) {
                throw new Error("Invalid categories response format");
            }

            return categories;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch categories"
            );
        }
    }
);

/**
 * Create new category (Admin)
 * Payload: { name }
 */
export const createCategory = createAsyncThunk(
    "categories/create",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/categories", payload);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create category"
            );
        }
    }
);

/* ============================================================
   Initial State
   ============================================================ */

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

/* ============================================================
   Slice
   ============================================================ */

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        /**
         * Allows local reset (logout, app reset, etc.)
         */
        resetCategories(state) {
            state.categories = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            /* ---------------- FETCH ---------------- */
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;

                // Ensure uniqueness by name (safety)
                const uniqueMap = new Map();
                action.payload.forEach((cat) => {
                    if (cat?.name) {
                        uniqueMap.set(cat.name, cat);
                    }
                });

                state.categories = Array.from(uniqueMap.values());
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ---------------- CREATE ---------------- */
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;

                // Prevent duplicates
                const exists = state.categories.some(
                    (cat) => cat.name === action.payload.name
                );

                if (!exists) {
                    state.categories.push(action.payload);
                }
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

/* ============================================================
   Exports
   ============================================================ */

export const { resetCategories } = categorySlice.actions;
export default categorySlice.reducer;