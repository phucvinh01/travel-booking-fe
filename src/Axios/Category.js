import Axios from '../Axios/Axios'

const getAllCategory = () => {
    return Axios.get('/LoaiTour/get-all-loai-tour')
}

const getOneCategoryById = (id) => {
    return Axios.get(`/LoaiTour/get-one-by-id-loai-tour?Id=${id}`)

}

const createOneCategory = (name) => {
    return Axios.post(`/LoaiTour/create-loai-tour`, {
        "tenLoai": name
    })
}

const updateOneCategory = (id, name) => {
    return Axios.post(`/LoaiTour/update-loai-tour`, {
        "id": id,
        "tenLoai": name
    })
}
const deleteOneCategory = (id) => {
    return Axios.post(`/LoaiTour/delete-loai-tour?Id=${id}`)
}



export { getAllCategory, getOneCategoryById, createOneCategory, updateOneCategory, deleteOneCategory }