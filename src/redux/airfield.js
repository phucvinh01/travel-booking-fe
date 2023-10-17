import { createSlice } from "@reduxjs/toolkit";
const airfieldSlice = createSlice({
    name: "airfield",
    initialState: {
        airfield: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getAirFieldStart: (state) => {
            state.airfield.isLoading = true
        },
        getAirFieldSuccess: (state, action) => {
            state.airfield.isLoading = false;
            state.airfield.data = action.payload;
        },
        getAirFieldFailed: (state) => {
            state.airfield.isLoading = false;
            state.airfield.error = true;
            state.airfield.data = null;
        },
    }
})


export const {
    getAirFieldStart, getAirFieldSuccess, getAirFieldFailed,
} = airfieldSlice.actions

export default airfieldSlice.reducer