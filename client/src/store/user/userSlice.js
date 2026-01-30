import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthUser } from "../auth/authSlice";
import axios from "../../api/axios";

/* =========================================================
   GET CURRENT USER (ME)
========================================================= */
export const getMe = createAsyncThunk(
    "user/getMe",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.get("/users/me");
            dispatch(setAuthUser(res.data));
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch user"
            );
        }
    }
);

/* =========================================================
   UPDATE BASIC PROFILE
========================================================= */
export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.put("/users/profile", payload);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Profile update failed"
            );
        }
    }
);

/* =========================================================
   UPDATE ORGANIZER PROFILE
========================================================= */
export const updateOrganizerProfile = createAsyncThunk(
    "user/updateOrganizerProfile",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.put("/users/organizer", payload);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Organizer profile update failed"
            );
        }
    }
);

/* =========================================================
   UPDATE SETTINGS
========================================================= */
export const updateSettings = createAsyncThunk(
    "user/updateSettings",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await axios.put("/users/settings", payload);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Settings update failed"
            );
        }
    }
);

/* =========================================================
   SLICE
========================================================= */
const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: null,
        success: false,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            /* ---------- PENDING ---------- */
            .addMatcher(
                (action) => action.type.startsWith("user/") && action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = false;
                }
            )

            /* ---------- FULFILLED ---------- */
            // inside userSlice extraReducers
            .addMatcher(
                (action) => action.type.startsWith("user/") && action.type.endsWith("/fulfilled"),
                (state) => {
                    state.loading = false;
                    state.success = true;
                }
            )

            /* ---------- REJECTED ---------- */
            .addMatcher(
                (action) => action.type.startsWith("user/") && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || "Something went wrong";
                }
            )
    },
});

export default userSlice.reducer;