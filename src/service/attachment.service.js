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
    getByProjectId(payload) {
        return request.get(
            baseUrl + '/project/' + payload
        )
    }
};

export default AttachmentService;
