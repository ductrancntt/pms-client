import request from "@/config/api/request";

const baseUrl = "api/project-log";
let ProjectLogService = {
    saveLog(payload) {
        return request.post(
            baseUrl + "/save",
            JSON.stringify(payload)
        )
    },
    getRecentProject(payload) {
        return request.get(
            baseUrl + "/get-recent-project"
        )
    },
};

export default ProjectLogService;
