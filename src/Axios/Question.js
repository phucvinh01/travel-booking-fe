import Axios from '../Axios/Axios'

const getAllQuestionInTourById = (id) => {
    return Axios.get(`/HoiDap/get-all-hoi-dap?IdTour=${id}`)
}

const postQuestion = (body) => {
    return Axios.post(`/HoiDap/create-hoi-dap`, body)
}

const getListReply = (idQuestion) => {
    return Axios.get(`/TraLoiHoiDap/get-all-tra-loi-hoi-dap?Id=${idQuestion}`)
}

export { getAllQuestionInTourById, postQuestion, getListReply }