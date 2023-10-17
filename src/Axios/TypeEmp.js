import Axios from '../Axios/Axios'

export const getAllTypeEmp = () => {
    return Axios.get('/LoaiNhanVien/get-loai-nhan-vien')
}