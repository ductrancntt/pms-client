import { Notification } from 'element-ui';
export default {
    show(type, title, message, duration, position){
        Notification({
            type: type,
            title: title,
            message: message,
            duration: duration,
            position: position //'bottom-right'
        });
    },
    success(title, message, duration, position){
        Notification.success({
            title: title,
            message: message,
            duration: duration,
            position: position //'bottom-right'
        });
    },
    error(title, message, duration, position){
        Notification.error({
            title: title,
            message: message,
            duration: duration,
            position: position //'bottom-right'
        });
    },
    warning(title, message, duration, position){
        Notification.warning({
            title: title,
            message: message,
            duration: duration,
            position: position //'bottom-right'
        });
    },
    info(title, message, duration, position){
        Notification.info({
            title: title,
            message: message,
            duration: duration,
            position: position //'bottom-right'
        });
    }
}