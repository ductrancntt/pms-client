import request from "@/config/api/request";

const baseUrl = "api/activity";
let ActivityService = {
    create(payload) {
        return request.post(
            baseUrl + "/create",
            JSON.stringify(payload)
        )
    },
    getAll(payload) {
        return request.get(
            baseUrl + "/list"
        )
    },
    get(payload) {
        return request.get(
            baseUrl + "/get/" + payload
        )
    },
    update(payload) {
        return request.put(
            baseUrl + "/update",
            JSON.stringify(payload)
        )
    },
    delete(payload) {
        return request.delete(
            baseUrl + "/delete/" + payload
        )
    },
    getByTaskId(payload){
        return request.get(
            baseUrl + '/task/' + payload
        )
    }
};

export default ActivityService;
