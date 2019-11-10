import request from "@/config/api/request";

const baseUrl = "api/category";
let CategoryService = {
    create(payload) {
        return request.post(
            baseUrl + "/create",
            JSON.stringify(payload)
        )
    },
    updateName(payload) {
        return request.put(
            baseUrl + "/update-name",
            JSON.stringify(payload)
        )
    },
    updatePos(payload) {
        return request.put(
            baseUrl + "/update-pos",
            JSON.stringify(payload)
        )
    },
    getByProject(payload){
        return request.get(
            baseUrl + "/get-by-project/" + payload,
        )
    },
    delete(payload) {
        return request.delete(
            baseUrl + "/delete/" + payload
        )
    },
    archive(payload) {
        return request.put(
            baseUrl + "/archive/" + payload
        )
    },
    unarchive(payload) {
        return request.put(
            baseUrl + "/un-archive/" + payload
        )
    }
};

export default CategoryService;
