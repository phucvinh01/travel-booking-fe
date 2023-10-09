import { createSlice } from "@reduxjs/toolkit";
const tourSlice = createSlice({
    name: "tours",
    initialState: {
        tours: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getToursStart: (state) => {
            state.tours.isLoading = true
        },
        getToursSuccess: (state, action) => {
            state.tours.isLoading = false;
            state.tours.data = action.payload;
        },
        getToursFailed: (state) => {
            state.tours.isLoading = false;
            state.tours.error = true;
        },
    }
})


export const {
    getToursStart, getToursSuccess, getToursFailed,
} = tourSlice.actions

export default tourSlice.reducer