import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchErrors = createAsyncThunk(
    "errors/fetch",
    async (params) => {
        const res = await axios.get("/errors", { params });
        return res.data;
    }
);

export const resolveError = createAsyncThunk(
    "errors/resolve",
    async (id) => {
        const res = await axios.patch(`/errors/${id}/resolve`);
        return res.data;
    }
);

const errorSlice = createSlice({
    name: "errors",
    initialState: {
        list: [],
        total: 0,
        loading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchErrors.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchErrors.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.errors;
                state.total = action.payload.total;
            })
            .addCase(resolveError.fulfilled, (state, action) => {
                const idx = state.list.findIndex(e => e._id === action.payload._id);
                if (idx !== -1) state.list[idx] = action.payload;
            });
    },
});

export default errorSlice.reducer;