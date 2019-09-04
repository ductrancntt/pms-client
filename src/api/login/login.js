import request from '@/api/request';

const loginUrl = "/api/account/authenticate"
export default function (username, password) {
    let data = {
        usernameOrEmail: username,
        password: password
    }
    return request.post(
        loginUrl,
        JSON.stringify(data),
        {
            headers: {'Content-Type': 'application/json'}
        }
    )
}