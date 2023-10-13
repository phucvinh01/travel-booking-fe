import Axios from './Axios'

const getCityList = () => {
    return Axios.get('https://provinces.open-api.vn/api/p/')
}
export { getCityList }