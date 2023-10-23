import Axios from '../Axios/Axios'

const getAllTour = () => {
    return Axios.get('/Tour/get-all-tour')
}
const getAllActive = () => {
    return Axios.get(`/Tour/get-all-tour-active?trangThai=true`)
}
const createTour = (body) => {
    return Axios.post('/Tour/create-tour', body)
}

const getCount = () => {
    return Axios.get('/Tour/get-count-all')
}

const getTourByStatus = (status) => {
    return Axios.get(`/Tour/get-all-tour-active/${status}`)
}

const getTourLast = () => {
    return Axios.get(`/Tour/get-tour-last`)
}

const getTourByPrice = (min, max) => {
    return Axios.get(`/Tour/get-list-theo-khoang-gia/${min}/${max}`)
}

const getTourByCategory = (idCate) => {
    return Axios.get(`/Tour/get-list-theo-loai?maLoai=${idCate}`)
}

const getTourByCategoryAndStatus = (idCate, status) => {
    return Axios.get(`/get-list-theo-loai-active/${idCate}/${status}`)
}

const getTourByUserCreate = (idUser) => {
    return Axios.get(`/get-list-theo-nguoi-lap/${idUser}`)

}

const getTourById = (id) => {
    return Axios.get(`/Tour/get-one-tour-by-id/?id=${id}`)

}

const getScheduleTour = (id) => {
    return Axios.get(`/ChiTietChuongTrinhTour/get-all-chi-tiet-chuong-trinh-tour?maTour=${id}`)
}

const postScheduleTour = (body) => {
    return Axios.post(`/ChiTietChuongTrinhTour/create-chi-tiet-chuong-trinh-tour`, body)

}

const getListTourByName = (name) => {
    return Axios.get(`/Tour/get-list-tour-by-theo-ten?tenTour=${name}`)

}





export {
    getListTourByName,
    getAllTour, createTour, getCount, getTourByStatus, getTourLast, getTourByPrice
    , getTourByCategory, getTourByCategoryAndStatus, getTourByUserCreate, getTourById,
    getScheduleTour, postScheduleTour,getAllActive

}