import Axios from '../Axios/Axios'

const getAllHotel = () => {
    return Axios.get('/KhachSan/get-all-khach-san')
}

const getListHotelByRate = (rate) => {
    return Axios.get(`/KhachSan/get-list-khach-san-theo-hang-sao?hangSao=${rate}`)
}

const getOneByTourId = (id) => {
    return Axios.get(`/KhachSan/get-one-tour-by-id?Id=${id}`)
}

const postCreateOneHotel = (body) => {
    return Axios.post(`/KhachSan/create-khach-san`, body)
}

const putUpdateOneHotel = (body) => {
    return Axios.put(`/KhachSan/update-khach-san`, body)
}

export { getAllHotel, getListHotelByRate, getOneByTourId, postCreateOneHotel, putUpdateOneHotel }