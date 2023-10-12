import Axios from '../Axios/Axios'


const getAllEmp = () => {
    return Axios.get(`/NhanVien/get-all-nhan-vien`)
}

const getListEmpByCate = (id) => {
    return Axios.get(`/NhanVien/get-list-nhan-vien-theo-loai?maLoaiNhanVien=${id}`)
}

const getEmpById = (id) => {
    return Axios.get(`/NhanVien/get-one-nhan-vien-by-id?Id=${id}`)

}
const postCreateOneEmp = (body) => {
    return Axios.post(`/NhanVien/create-nhan-vien`, body)
}

const putUpdateEmp = (body) => {
    return Axios.put(`/NhanVien/update-nhan-vien`, body)
}

const deleteEmp = (id) => {
    return Axios.delete(`delete-nhan-vien?Id=${id}`)
}

export { getAllEmp, getEmpById, getListEmpByCate, postCreateOneEmp, putUpdateEmp, deleteEmp }