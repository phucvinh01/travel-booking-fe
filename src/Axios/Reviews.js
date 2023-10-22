import Axios from '../Axios/Axios'


const getAllReviewInTourById = (id) => {
    return Axios.get(`/NhanXet/get-all-nhan-xet?Id=${id}`)
}

const postReview = (body) => {
    return Axios.post(`/NhanXet/create-nhan-xet`, body)
}

export { getAllReviewInTourById, postReview }