import request from "@/config/api/request";

const baseUrl = "api/account";
let AccountService = {
    authenticate(payload) {
        return request.post(
            baseUrl + "/authenticate",
            JSON.stringify(payload)
        )
    },
    register(payload) {
        return request.post(
            baseUrl + "/register",
            JSON.stringify(payload)
        )
    },
    getCurrentAccount(){
        return request.get(
            baseUrl + "/current"
        )
    },
    updateCurrentAccount(payload){
        return request.put(
            baseUrl + "/update",
            payload,
            {
                headers: {
                    'Content-Type': undefined
                }
            }
        )
    },
    changePassword(payload){
        return request.post(
            baseUrl + "/change_password",
            JSON.stringify(payload)
        )
    },
    activateAccount(payload){
        return request.post(
            baseUrl + "/activate",
            payload
        )
    },
    getActivationKey(payload){
        return request.post(
            baseUrl + "/activation_key",
            JSON.stringify(payload)
        )
    },
    resetPasswordRequest(payload){
        return request.post(
            baseUrl + "/reset_password/request",
            payload
        )
    },
    resetPasswordFinish(payload){
        return request.post(
            baseUrl + "/reset_password/finish",
            payload
        )
    },
    getProject(payload){
        return request.get(
            'api/projects/' + payload
        )
    }
};

export default AccountService;
