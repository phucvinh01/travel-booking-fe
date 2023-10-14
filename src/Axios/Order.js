import Axios from '../Axios/Axios'

const postCreateOrder = (body) => {
    return Axios.post('/DatTour/create-dat-tour', body)
}

const getAllOrder = () => {
    return Axios.get(`/DatTour/get-dat-tour`)
}

const getOneOrderById = (id) => {
    return Axios.get(`/DatTour/get-one-dat-tour?maDatTour=${id}`)
}

const putUpdateOrder = (body) => {
    return Axios.put(`/DatTour/update-dat-tour`, body)
}

export { postCreateOrder, getAllOrder, getOneOrderById, putUpdateOrder }
