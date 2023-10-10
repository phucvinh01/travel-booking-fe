import axios from '../Axios/Axios'
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from './authSlice'
import { getToursFailed, getToursStart, getToursSuccess } from './tourSlice'
import { getAllTour } from '../Axios/Tour'
import { getCateFailed, getCateStart, getCateSuccess } from './categorySlice'
import { getAllCategory } from '../Axios/Category'

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
        const res = await axios.post('/v1/auth/logout')
        dispatch(logoutSuccess(res))
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
        console.log(res);
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



