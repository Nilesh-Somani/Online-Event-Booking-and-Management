import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* ---------------- LOGIN ---------------- */
export const login = createAsyncThunk(
    "auth/login",
    async ({ identifier, password }, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", {
                identifier,
                password,
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

/* ---------------- REGISTER ---------------- */
export const register = createAsyncThunk(
    "auth/register",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/register", payload);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Registration failed");
        }
    }
);

/* ---------------- CHECK EMAIL ---------------- */
export const checkEmailAvailability = createAsyncThunk(
    "auth/checkEmail",
    async (email, { rejectWithValue }) => {
        try {
            const res = await api.get(
                `/auth/check-availability`,
                { params: { field: "email", value: email } }
            );
            return res.data.available;
        } catch {
            return rejectWithValue(false);
        }
    }
);

/* ---------------- CHECK USER ID ---------------- */
export const checkUserIdAvailability = createAsyncThunk(
    "auth/checkUserId",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await api.get(
                `/auth/check-availability`,
                { params: { field: "userId", value: userId } }
            );
            return res.data.available;
        } catch {
            return rejectWithValue(false);
        }
    }
);

/* ---------------- SLICE ---------------- */

const storedUser = JSON.parse(localStorage.getItem("authUser"));

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: storedUser || null,
        loading: false,
        error: null,
        availability: {
            email: null,
            userId: null,
            checking: false,
        },
    },
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem("authUser");
            localStorage.removeItem("authToken");
        },
        resetEmailAvailability(state) {
            state.availability.email = null;
        },
        resetUserIdAvailability(state) {
            state.availability.userId = null;
        },
        setAuthUser(state, action) {
            state.user = action.payload;
            localStorage.setItem("authUser", JSON.stringify(action.payload));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem("authUser", JSON.stringify(action.payload.user));
                localStorage.setItem("authToken", action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                localStorage.setItem("authUser", JSON.stringify(action.payload.user));
                localStorage.setItem("authToken", action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(checkEmailAvailability.pending, (state) => {
                state.availability.checking = true;
            })
            .addCase(checkEmailAvailability.fulfilled, (state, action) => {
                state.availability.checking = false;
                state.availability.email = action.payload;
            })
            .addCase(checkEmailAvailability.rejected, (state) => {
                state.availability.checking = false;
                state.availability.email = false;
            })

            .addCase(checkUserIdAvailability.pending, (state) => {
                state.availability.checking = true;
            })
            .addCase(checkUserIdAvailability.fulfilled, (state, action) => {
                state.availability.checking = false;
                state.availability.userId = action.payload;
            })
            .addCase(checkUserIdAvailability.rejected, (state) => {
                state.availability.checking = false;
                state.availability.userId = false;
            });
    },
});

export const { logout, resetEmailAvailability, resetUserIdAvailability, setAuthUser, } = authSlice.actions;

export default authSlice.reducer;