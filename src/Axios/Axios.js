import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://localhost:7016/',
    interceptors: [
        {
            request(request) {
                request.headers["Access-Control-Allow-Origin"] = "*";
                return request;
            },
        },
    ],
});
instance.interceptors.response.use(function (response) {
    return response.data ? response.data : { statusCode: response.status, headers: response.headers }
}, function (error) {
    let res = {}
    if (error.response) {
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    return res;

});


export default instance