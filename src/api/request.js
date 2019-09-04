import axios from 'axios';

function getToken() {
    return localStorage.getItem('access-token');
}

const baseDomain = "http://localhost:8888";
const baseUrl = `${baseDomain}/api`;

export default axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        "Authorization": (getToken() != null && getToken() != undefined) ? "Bearer" + getToken() : "",
    }
});
