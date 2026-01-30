import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

/* =======================
   ASYNC THUNKS
======================= */

// Fetch existing draft
export const fetchEventDraft = createAsyncThunk(
    "eventDraft/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/event-draft");
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// Save / Update draft
export const saveEventDraft = createAsyncThunk(
    "eventDraft/save",
    async (draftData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/event-draft", draftData);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// Clear draft after publish
export const clearEventDraft = createAsyncThunk(
    "eventDraft/clear",
    async (_, { rejectWithValue }) => {
        try {
            await axios.delete("/event-draft");
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

/* =======================
   SLICE
======================= */

const initialState = {
    draft: null,
    loading: false,
    error: null,
};

const eventDraftSlice = createSlice({
    name: "eventDraft",
    initialState,
    reducers: {
        updateDraftField(state, action) {
            const { field, value } = action.payload;
            if (!state.draft) state.draft = {};
            state.draft[field] = value;
        },
    },
    extraReducers: (builder) => {
        builder
            /* FETCH */
            .addCase(fetchEventDraft.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEventDraft.fulfilled, (state, action) => {
                state.loading = false;
                state.draft = action.payload;
            })
            .addCase(fetchEventDraft.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* SAVE */
            .addCase(saveEventDraft.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveEventDraft.fulfilled, (state, action) => {
                state.loading = false;
                state.draft = action.payload;
            })
            .addCase(saveEventDraft.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* CLEAR */
            .addCase(clearEventDraft.fulfilled, (state) => {
                state.draft = null;
            });
    },
});

export const { updateDraftField } = eventDraftSlice.actions;
export default eventDraftSlice.reducer;