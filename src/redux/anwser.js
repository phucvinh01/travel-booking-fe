import { createSlice } from "@reduxjs/toolkit";
const AnwserSlice = createSlice({
    name: "Anwser",
    initialState: {
        Anwser: {
            data: null,
            isLoading: false,
            error: false
        },
    },
    reducers: {
        getAnwserStart: (state) => {
            state.Anwser.isLoading = true
        },
        getAnwserSuccess: (state, action) => {
            state.Anwser.isLoading = false;
            state.Anwser.data = action.payload;
        },
        getAnwserFailed: (state) => {
            state.Anwser.isLoading = false;
            state.Anwser.error = true;
            state.Anwser.data = null;
        },
    }
})


export const {
    getAnwserStart, getAnwserSuccess, getAnwserFailed,
} = AnwserSlice.actions

export default AnwserSlice.reducer