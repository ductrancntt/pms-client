import request from "@/config/api/request";

const baseUrl = "api/note";
let NoteService = {
    create(payload) {
        return request.post(
            baseUrl + "/create",
            JSON.stringify(payload)
        )
    },
    getAll() {
        return request.get(
            baseUrl + "/all"
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
    }
};

export default NoteService;
