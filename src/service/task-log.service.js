import request from "@/config/api/request";

const baseUrl = "api/task-log";
let TaskLogService = {
    saveLog(payload) {
        return request.post(
            baseUrl + "/save",
            JSON.stringify(payload)
        )
    },
    getRecentTask(payload) {
        return request.get(
            baseUrl + "/get-recent-task"
        )
    },
};

export default TaskLogService;
