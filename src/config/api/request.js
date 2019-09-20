import axios from 'axios';
import constants from "@/constants";
import AuthService from "@/security/auth.service";

const baseUrl = constants.SERVER_API_URL;
const timeout = 100000;

const request = axios.create({
    baseURL: baseUrl,
    timeout: timeout,
    headers: {'Content-Type': 'application/json'},
});

request.interceptors.request.use(
    function (config) {
        const token = AuthService.getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data) return response.data;
    return response
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.data) return Promise.reject(error.response.data);
    return Promise.reject(error);
});

export default request;
