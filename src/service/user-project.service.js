import request from "@/config/api/request";

const baseUrl = "api/user-project";
let UserProjectService = {
    getUserProjectByProjectId(payload) {
        return request.get(
            baseUrl + "/project/" + payload
        )
    },
    getOverviewByCurrentUser() {
        return request.get(
            baseUrl + "/current-user/overview"
        )
    },
    getProjectByCurrentUser() {
        return request.get(
            baseUrl + "/current-user",
        )
    },
    getProjectByUsername(payload) {
        return request.get(
            baseUrl + "/user/" + payload
        )
    },
    countProjectMember(payload){
        return request.get(
            baseUrl + "/count-member/" + payload
        )
    },
    getProjectByCurrentUserWithRoleManager(payload) {
        return request.get(
            baseUrl + "/user/" + payload
        )
    },
    getProjectByCurrentUserWithRoleMember(payload) {
        return request.get(
            baseUrl + "/user/" + payload
        )
    },
    getByCloseStatus(payload) {
        return request.get(
            baseUrl + "/user/" + payload
        )
    },
    update(payload) {
        return request.put(
            baseUrl + "/update",
            JSON.stringify(payload)
        )
    },
    deleteMember(payload) {
        return request.delete(
            baseUrl + "/delete",
            {
                params: payload
            }
        )
    },
};

export default UserProjectService;
