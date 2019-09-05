import axios from 'axios';

function getToken() {
    return localStorage.getItem('access-token');
}

const baseUrl = "http://localhost:8888";
const timeout = 10000;

const http = axios.create ({
    baseURL: baseUrl,
    timeout: timeout,
    headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use (
    function (config) {
        const token = getToken()
        if (token != null || token != undefined) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject (error);
    }
);

export default http;
