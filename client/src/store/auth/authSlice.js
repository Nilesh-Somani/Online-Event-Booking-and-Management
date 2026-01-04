import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../api/api";

/* ---------------- LOGIN ---------------- */
export const login = createAsyncThunk(
    "auth/login",
    async ({ identifier, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);

            return data.user;
        } catch {
            return rejectWithValue("Server error");
        }
    }
);

/* ---------------- REGISTER ---------------- */
export const register = createAsyncThunk(
    "auth/register",
    async (
        { firstName, middleName, lastName, email, userId, password, role },
        { rejectWithValue }
    ) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    middleName,
                    lastName,
                    email,
                    userId,
                    password,
                    role,
                }),
            });

            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);

            return data.user;
        } catch {
            return rejectWithValue("Server error");
        }
    }
);

/* ---------------- CHECK EMAIL ---------------- */
export const checkEmailAvailability = createAsyncThunk(
    "auth/checkEmail",
    async (email, { rejectWithValue }) => {
        try {
            const res = await fetch(
                `${API_BASE_URL}/api/auth/check-availability?field=email&value=${email}`
            );
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);
            return data.available;
        } catch {
            return rejectWithValue("Server error");
        }
    }
);

/* ---------------- CHECK USER ID ---------------- */
export const checkUserIdAvailability = createAsyncThunk(
    "auth/checkUserId",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await fetch(
                `${API_BASE_URL}/api/auth/check-availability?field=userId&value=${userId}`
            );
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.message);
            return data.available;
        } catch {
            return rejectWithValue("Server error");
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
            email: null,   // true | false | null
            userId: null,
            checking: false,
        },
    },
    reducers: {
        logout(state) {
            state.user = null;
            localStorage.removeItem("authUser");
        },
        resetEmailAvailability(state) {
            state.availability.email = null;
        },
        resetUserIdAvailability(state) {
            state.availability.userId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* ---------------- LOGIN ---------------- */
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem("authUser", JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ---------------- REGISTER ---------------- */
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem("authUser", JSON.stringify(action.payload));
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ---------------- EMAIL ---------------- */
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

            /* ---------------- USER ID ---------------- */
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
    }
});

export const { logout, resetEmailAvailability, resetUserIdAvailability } = authSlice.actions;
export default authSlice.reducer;