import { createSlice } from "@reduxjs/toolkit";
const flightSlice = createSlice({
    name: "flight",
    initialState: {
        flight: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getflightStart: (state) => {
            state.flight.isLoading = true
        },
        getflightSuccess: (state, action) => {
            state.flight.isLoading = false;
            state.flight.data = action.payload;
        },
        getflightFailed: (state) => {
            state.flight.isLoading = false;
            state.flight.error = true;
            state.flight.data = null;
        },
    }
})


export const {
    getflightStart, getflightSuccess, getflightFailed,
} = flightSlice.actions

export default flightSlice.reducer