import request from "@/config/api/request";

const baseUrl = "api/attachment";
let AttachmentService = {
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
    upload(payload) {
        return request.post(
            baseUrl + "/project/upload",
            payload,
            {
                headers: {
                    'Content-Type': undefined
                }
            }
        )
    },
    getByProjectId(payload) {
        return request.get(
            baseUrl + '/project/' + payload
        )
    },
    delete(payload) {
        return request.delete(
            baseUrl + "/delete/" + payload
        )
    },
};

export default AttachmentService;
