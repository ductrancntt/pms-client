import request from "@/config/api/request";

const baseUrl = "api/activity";
let ActivityService = {
    getByTaskId(payload) {
        return request.get(
            baseUrl + '/task/' + payload
        )
    }
};

export default ActivityService;
