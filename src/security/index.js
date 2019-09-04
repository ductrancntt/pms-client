import router from '../router/router';
import auth from '@/security/authentication';
import path from "@/router/path";

const publicPages = [
    path.login,
    path.register,
];

function isPublicPage(page) {
    return publicPages.indexOf(page) > -1;
}

router.beforeEach((to, from, next) => {
    if (auth.isAuthenticated()) {
        if (to.path == path.login) {
            next(path.home);
        } else {
            next();
        }
    } else {
        // case user un authenticate
        if (isPublicPage(to.path)) {
            next();
        } else {
            next(path.login);
        }
    }
});