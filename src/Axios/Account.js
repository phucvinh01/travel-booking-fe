import Axios from '../Axios/Axios'

const getAccount = () => {
    return Axios.get('/TaiKhoan/get-tai-khoan')
}

const getOneById = (id) => {
    return Axios.get(`/TaiKhoan/get-one-tai-khoan-by-id?Id=${id}`)
}

const postLogin = (body) => {
    return Axios.post('/TaiKhoan/login', body)
}

const postRegiser = (body) => {
    return Axios.post('/TaiKhoan/create-tai-khoan', body)

}

const putUpdateAccount = (body) => {
    return Axios.put('/TaiKhoan/update-tai-khoan', body)
}

const deleteAccount = (id) => {
    return Axios.get(`/TaiKhoan/delete-tai-khoan?Id=${id}`)
}


const putChangePassword = (body) => {
    return Axios.put(`/TaiKhoan/change-password`, body)
}

const putForgotPassword = (email) => {
    return Axios.put(`/TaiKhoan/forget-password?email=${email}`)
}


export { putForgotPassword, putChangePassword, getAccount, getOneById, postLogin, postRegiser, putUpdateAccount, deleteAccount }