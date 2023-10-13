import Axios from '../Axios/Axios'

const getAllCustomer = () => {
    return Axios.get('/KhachHang/get-all-khach-hang')
}

const getOneCusTomerById = (id) => {
    return Axios.get(`/KhachHang/get-one-khach-hang-by-id?Id=${id}`)
}


export { getAllCustomer, getOneCusTomerById }