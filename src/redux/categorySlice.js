import { createSlice } from "@reduxjs/toolkit";
const categorySlice = createSlice({
    name: "category",
    initialState: {
        category: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getCateStart: (state) => {
            state.category.isLoading = true
        },
        getCateSuccess: (state, action) => {
            state.category.isLoading = false;
            state.category.data = action.payload;
        },
        getCateFailed: (state) => {
            state.category.isLoading = false;
            state.category.error = true;
        },
    }
})


export const {
    getCateStart, getCateSuccess, getCateFailed,
} = categorySlice.actions

export default categorySlice.reducer