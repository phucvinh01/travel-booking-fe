import Axios from '../Axios/Axios'

const getAllFlight = () => {
    return Axios.get('/ChuyenBay/get-danh-sach-chuyen-bay')
}

const getOneFlightById = (id) => {
    return Axios.get(`/ChuyenBay/get-one-chuyen-bay-by-id?Id=${id}`)
}

const getListTakeOffByAirportId = (id) => {
    return Axios.get(`/ChuyenBay/get-list-noi-di?maSanBay=${id}`)
}

const getListLandsByAirportId = (id) => {
    return Axios.get(`/ChuyenBay/get-list-noi-den?maSanBay=${id}`)
}

const getListByTimeStartAndEnd = (start, end) => {
    return Axios.get(`/ChuyenBay/get-list-theo-ngay?gioDi=${start}&gioDen=${end}`)
}

const getListRoundTrip = (value) => {
    return Axios.get(`/ChuyenBay/get-list-khu-hoi?khuHoi=${value}`)

}

const postCreateFlight = (body) => {
    return Axios.post(`/ChuyenBay/create-one-chuyen-bay`, body)
}

const putFlight = (body) => {
    return Axios.post(`/ChuyenBay/update-chuyen-bay`, body)

}

export {
    getAllFlight, getOneFlightById, getListTakeOffByAirportId, getListLandsByAirportId
    , getListByTimeStartAndEnd, getListRoundTrip, postCreateFlight, putFlight
}