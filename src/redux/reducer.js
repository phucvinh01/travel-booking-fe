import { combineReducers } from "@reduxjs/toolkit"
import authReducer from './authSlice'
import tourSlice from "./tourSlice"
import categorySlice from "./categorySlice"

const rootReducer = combineReducers({
    auth: authReducer,
    tour: tourSlice,
    cate: categorySlice
})

export default rootReducer