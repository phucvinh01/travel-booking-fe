import axios from '../Axios/Axios'
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from './authSlice'
import { getToursFailed, getToursStart, getToursSuccess } from './tourSlice'
import { getAllTour } from '../Axios/Tour'
import { getCateFailed, getCateStart, getCateSuccess } from './categorySlice'
import { getAllCategory } from '../Axios/Category'
import { getHotelFailed, getHotelStart, getHotelSuccess } from './hotelSlice'
import { getAllHotel } from '../Axios/Hotel'
import { getflightFailed, getflightStart, getflightSuccess } from './flightSlice'
import { getAllFlight } from '../Axios/flight'
import { getAllEmp } from '../Axios/Employee'
import { getEmpFailed, getEmpStart, getEmpSuccess } from './empSlice'
import { getTypeFailed, getTypeStart, getTypeSuccess } from './typeSlice'
import { getAllType } from '../Axios/typeAccount'
import { getAirFieldFailed, getAirFieldStart, getAirFieldSuccess } from './airfield'
import { getAllAir } from '../Axios/Air'

export const login = async (user, dispatch, navigCate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('/v1/auth/login', user)
        if (res.status === 1) {
            dispatch(loginSuccess(res))
            if (res.role === 1) {
                navigate('/admin')
                return
            }
            navigate('/')
        }
        else {
            if (res.status === 2) {
                dispatch(loginFailed(res))
            }
        }
    }
    catch (err) {
        dispatch(loginFailed())
    }
}


export const logout = async (dispatch, id, navigate, token) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess())
        navigate('/')
    }
    catch (err) {
        dispatch(logoutFailed())

    }
}

export const getItems = async (dispatch) => {
    dispatch(getToursStart());
    try {
        const res = await getAllTour()
        if (res.statusCode && res.statusCode === 204) {
            dispatch(getToursFailed())
        }
        else {
            dispatch(getToursSuccess(res))
        }
    }
    catch (err) {
        dispatch(getToursFailed())
    }
}

export const getCategory = async (dispatch) => {
    dispatch(getCateStart());
    try {
        const res = await getAllCategory()
        if (res.statusCode && res.statusCode === 204) {
            dispatch(getCateFailed())
        } else {
            dispatch(getCateSuccess(res))
        }
    }
    catch (err) {
        dispatch(getCateFailed())
    }
}

export const getHotel = async (dispatch) => {
    dispatch(getHotelStart());
    try {
        const res = await getAllHotel()
        if (res.statusCode && res.statusCode === 204) {
            dispatch(getHotelFailed())
        } else {
            dispatch(getHotelSuccess(res))
        }
    }
    catch (err) {
        dispatch(getHotelFailed())
    }
}

export const getflight = async (dispatch) => {
    dispatch(getflightStart());
    try {
        const res = await getAllFlight()
        if (res.statusCode && res.statusCode === 204) {
            dispatch(getflightFailed())
        } else {
            dispatch(getflightSuccess(res))
        }
    }
    catch (err) {
        dispatch(getflightFailed())
    }
}

export const getAllEmployee = async (dispatch) => {
    dispatch(getEmpStart());

    try {
        const res = await getAllEmp()
        if (res.statusCode && res.statusCode === 204) {
            dispatch(getEmpFailed())
        } else {
            dispatch(getEmpSuccess(res))
        }
    }
    catch (err) {
        dispatch(getEmpFailed())
    }
}

export const getType = async (dispatch) => {
    dispatch(getTypeStart());
    try {
        const res = await getAllType()
        if (res.statusCode && res.statusCode === 204) {
            dispatch(getTypeFailed())
        } else {
            dispatch(getTypeSuccess(res))
        }
    }
    catch (err) {
        dispatch(getTypeFailed())
    }
}

export const getAri = async (dispatch) => {
    dispatch(getAirFieldStart());
    try {
        const res = await getAllAir()
        if (res.statusCode && res.statusCode === 204) {
            dispatch(getAirFieldFailed())
        } else {
            dispatch(getAirFieldSuccess(res))
        }
    }
    catch (err) {
        dispatch(getAirFieldFailed())
    }
}



