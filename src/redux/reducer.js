import { combineReducers } from "@reduxjs/toolkit"
import authReducer from './authSlice'
import tourSlice from "./tourSlice"
import categorySlice from "./categorySlice"
import hotelSlice from './hotelSlice'
import flightSlice from "./flightSlice"
import empSlice from "./empSlice"
const rootReducer = combineReducers({
    auth: authReducer,
    tour: tourSlice,
    cate: categorySlice,
    hotel: hotelSlice,
    flight: flightSlice,
    emp: empSlice
})

export default rootReducer