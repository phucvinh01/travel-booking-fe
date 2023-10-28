import Axios from '../Axios/Axios'

const getAllCustomer = () => {
    return Axios.get('/KhachHang/get-all-khach-hang')
}

const getOneCusTomerById = (id) => {
    return Axios.get(`/KhachHang/get-one-khach-hang-by-id?Id=${id}`)
}

const postCreateCustomer = (body) => {
    return Axios.post(`/KhachHang/create-khach-hang`, body)
}

const getOneCusTomerByIdAccoutn = (id) => {
    return Axios.get(`/KhachHang/get-one-khach-hang-by-ma-tai-khoan-id?maTaiKhoan=${id}`)
}

const updateCustomer = (body) => {
    return Axios.put(`/KhachHang/update-khach-hang`, body)
}


export { getAllCustomer, getOneCusTomerById, postCreateCustomer, getOneCusTomerByIdAccoutn, updateCustomer }