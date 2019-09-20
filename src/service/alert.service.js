import {Notification} from 'element-ui';

let defaultDuration = 3000;
let AlertService = {
    show(type, title, message, duration) {
        Notification({
            type: type,
            title: title,
            message: message,
            duration: duration ? duration : defaultDuration,
        });
    },
    success(message, duration) {
        Notification.success({
            title: "Success",
            message: message,
            duration: duration ? duration : defaultDuration,
        });
    },
    error(message, duration) {
        Notification.error({
            title: "Error",
            message: message,
            duration: duration ? duration : defaultDuration,
        });
    },
    warning(message, duration) {
        Notification.warning({
            title: "Warning",
            message: message,
            duration: duration ? duration : defaultDuration,
        });
    },
    info(message, duration) {
        Notification.info({
            title: "Info",
            message: message,
            duration: duration ? duration : defaultDuration,
        });
    }
};
export default AlertService;