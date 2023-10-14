import Axios from '../Axios/Axios'

const getAllAir = () => {
    return Axios.get('/SanBay/get-all-san-bay')
}

const getOneAirById = (id) => {
    return Axios.get(`/SanBay/get-one-san-bay-by-id?Id=${id}`)
}

const postCreateAir = (body) => {
    return Axios.post(`/SanBay/create-san-bay`, body)
}

const putUpdateAir = (body) => {
    return Axios.put(`/SanBay/update-san-bay`, body)

}

export { getAllAir, getOneAirById, postCreateAir, putUpdateAir }