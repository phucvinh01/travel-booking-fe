import { createSlice } from "@reduxjs/toolkit";
const hotelSlice = createSlice({
    name: "hotel",
    initialState: {
        hotel: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getHotelStart: (state) => {
            state.hotel.isLoading = true
        },
        getHotelSuccess: (state, action) => {
            state.hotel.isLoading = false;
            state.hotel.data = action.payload;
        },
        getHotelFailed: (state) => {
            state.hotel.isLoading = false;
            state.hotel.error = true;
            state.hotel.data = null;
        },
    }
})


export const {
    getHotelStart, getHotelSuccess, getHotelFailed,
} = hotelSlice.actions

export default hotelSlice.reducer