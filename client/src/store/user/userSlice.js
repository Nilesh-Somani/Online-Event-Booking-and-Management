import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthUser } from "../auth/authSlice";
import { API_BASE_URL } from "../../api/api";

/* =========================================================
   GET CURRENT USER (ME)
========================================================= */
export const getMe = createAsyncThunk(
    "user/getMe",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch(`${API_BASE_URL}/api/users/me`, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);
            dispatch(setAuthUser(data))
            return data;
        } catch (err) {
            return rejectWithValue("Failed to fetch user");
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
            const token = localStorage.getItem("authToken");
            const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);
            return data;
        } catch (err) {
            return rejectWithValue("Profile update failed");
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
            const token = localStorage.getItem("authToken");
            const res = await fetch(
                `${API_BASE_URL}/api/users/organizer`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, },
                    credentials: "include",
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);
            return data;
        } catch (err) {
            return rejectWithValue("Organizer profile update failed");
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
            const token = localStorage.getItem("authToken");
            const res = await fetch(`${API_BASE_URL}/api/users/settings`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);
            return data;
        } catch (err) {
            return rejectWithValue("Settings update failed");
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