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
    },
    confirm(title, message, preConfirm) {
        /* callback is handle function when click confirm or cancel action */
        return Swal.fire({
            title: title ? title : 'Are you sure?',
            text: message ? message : "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText:'Confirm',
            cancelButtonText: 'Cancel!',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: preConfirm
        });
    },
    confirmDelete(title, message, preConfirm) {
        /* callback is handle function when click confirm or cancel action */
        return Swal.fire({
            title: title ? title : 'Are you sure?',
            text: message ? message : "You won't be able to revert this!",
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText:'Confirm',
            cancelButtonText: 'Cancel!',
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            preConfirm: preConfirm
        });
    }
};

export default SweetAlert;
