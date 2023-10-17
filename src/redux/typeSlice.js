import { createSlice } from "@reduxjs/toolkit";
const typeSlice = createSlice({
    name: "type",
    initialState: {
        type: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getTypeStart: (state) => {
            state.type.isLoading = true
        },
        getTypeSuccess: (state, action) => {
            state.type.isLoading = false;
            state.type.data = action.payload;
        },
        getTypeFailed: (state) => {
            state.type.isLoading = false;
            state.type.error = true;
        },
    }
})


export const {
    getTypeStart, getTypeSuccess, getTypeFailed,
} = typeSlice.actions

export default typeSlice.reducer