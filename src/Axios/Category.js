import Axios from '../Axios/Axios'

const getAllCategory = () => {
    return Axios.get('/LoaiTour/get-all-loai-tour')
}

export { getAllCategory }