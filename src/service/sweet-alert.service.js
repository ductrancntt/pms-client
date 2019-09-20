import Swal from "sweetalert2";

const SweetAlert = {
    success(title, message, confirmBtnText, cancellable) {
        return Swal.fire({
            title: title,
            text: message,
            type: 'success',
            showCancelButton: cancellable ? cancellable : false,
            confirmButtonText: confirmBtnText ? confirmBtnText : 'OK'
        });
    },
    error(title, message, confirmBtnText, cancellable) {
        return Swal.fire({
            title: title,
            text: message,
            type: 'error',
            showCancelButton: cancellable ? cancellable : false,
            confirmButtonText: confirmBtnText ? confirmBtnText : 'OK'
        });
    }
};

export default SweetAlert;