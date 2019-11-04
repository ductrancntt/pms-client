import request from "@/config/api/request";

const baseUrl = "api/category";
let CategoryService = {
    create(payload) {
        return request.post(
            baseUrl + "/create",
            JSON.stringify(payload)
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
    archive(payload) {
        return request.put(
            baseUrl + "/archive/" + payload
        )
    }
};

export default CategoryService;
