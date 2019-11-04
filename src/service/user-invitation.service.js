import request from "@/config/api/request";

const baseUrl = "api/user-invitation";
let UserInvitationService = {
    sendInvitationRequest(payload) {
        return request.post(
            baseUrl + "/request",
            JSON.stringify(payload)
        )
    },
    responseToInvitation(payload) {
        return request.post(
            baseUrl + "/response",
            JSON.stringify(payload)
        )
    },
    getByCurrentUser() {
        return request.get(
            baseUrl + "/current-user"
        )
    }
};

export default UserInvitationService;
