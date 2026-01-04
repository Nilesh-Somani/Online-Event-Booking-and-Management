import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    loading: false,
};

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setEvents(state, action) {
            state.list = action.payload;
        },
    },
});

export const { setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;