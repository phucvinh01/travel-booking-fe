import Axios from '../Axios/Axios'

const getAllTour = () => {
    return Axios.get('/Tour/get-all-tour')
}

export { getAllTour }