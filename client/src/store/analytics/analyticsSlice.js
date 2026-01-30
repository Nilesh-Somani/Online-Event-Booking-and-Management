import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchAnalytics = createAsyncThunk(
    "analytics/fetch",
    async ({ timeFrame }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/analytics?timeFrame=${timeFrame}`);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const analyticsSlice = createSlice({
    name: "analytics",
    initialState: {
        loading: false,
        snapshot: null,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAnalytics.pending, state => {
                state.loading = true;
            })
            .addCase(fetchAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.snapshot = action.payload;
            })
            .addCase(fetchAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default analyticsSlice.reducer;