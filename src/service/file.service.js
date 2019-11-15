import request from "@/config/api/request";

const baseUrl = "api/file";
let FileService = {
    download(payload, name, callback) {
        return request.get(
            baseUrl + "/download",
            {
                params: {
                    fileId: payload
                },
                responseType: 'blob'
            }
        ).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.download = name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            if (callback) callback();
        }).catch((error) => {
            if (callback) callback();
            console.log(error);
        });
    },

};

export default FileService;
