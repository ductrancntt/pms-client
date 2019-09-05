import request from "@/api/request";

const baseUrl = "api/account";
export default {
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
            JSON.stringify(payload)
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
            JSON.stringify(payload)
        )
    },
    resetPasswordFinish(payload){
        return request.post(
            baseUrl + "/reset_password/finish",
            JSON.stringify(payload)
        )
    },
    checkResetKey(payload){
        return request.post(
            baseUrl + "/reset_password/check",
            JSON.stringify(payload)
        )
    }
}