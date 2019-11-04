import request from "@/config/api/request";

const baseUrl = "api/user-notification";
let UserNotificationService = {
    getByUser(payload) {
        return request.get(
            baseUrl + '/current-user'
        )
    }
};

export default UserNotificationService;
