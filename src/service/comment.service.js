import request from "@/config/api/request";

const baseUrl = "api/comment";
let CommentService = {
    create(payload) {
        return request.post(
            baseUrl + "/create",
            payload,
            {
                headers: {
                    'Content-Type': undefined
                }
            }
        )
    },
    getByTask(payload) {
        return request.get(
            baseUrl + "/task/" + payload
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
    delete(payload) {
        return request.delete(
            baseUrl + "/delete/" + payload
        )
    }
};

export default CommentService;
