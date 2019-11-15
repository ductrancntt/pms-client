import request from "@/config/api/request";

const baseUrl = "api/user-notification";
let UserNotificationService = {
    getByUser(payload) {
        return request.get(
            baseUrl + '/current-user'
        )
    },
    getUnseenNotification(payload) {
        return request.get(
            baseUrl + '/unseen'
        )
    },
    userSeenNotification(payload) {
        return request.put(
            baseUrl + "/seen",
            JSON.stringify(payload)
        )
    }
};

export default UserNotificationService;
