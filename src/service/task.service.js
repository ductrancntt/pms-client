import request from "@/config/api/request";

const baseUrl = "api/task";
let TaskService = {
    create(payload) {
        return request.post(
            baseUrl + "/create",
            JSON.stringify(payload)
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
            payload,
            {
                headers: {
                    'Content-Type': undefined
                }
            }
        )
    },
    updatePosition(payload) {
        return request.put(
            baseUrl + "/update-position",
            JSON.stringify(payload)
        )
    },
    updateListPosition(payload) {
        return request.put(
            baseUrl + "/update-list-position",
            JSON.stringify(payload)
        )
    },
    delete(payload) {
        return request.delete(
            baseUrl + "/delete/" + payload
        )
    },
};

export default TaskService;
