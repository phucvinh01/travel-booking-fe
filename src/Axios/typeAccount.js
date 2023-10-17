import Axios from '../Axios/Axios'


const getAllType = () => {
    return Axios.get(`/LoaiTaiKhoan/get-all-loai-tai-khoan`)
}

export { getAllType }

