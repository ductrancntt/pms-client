import router from '../router/router';
import auth from '@/security/authentication';
import path from "@/router/path";

const publicPages = [
    path.loginUrl,
    path.registerUrl,
    path.account.activate,
];

function isPublicPage(page) {
    return publicPages.indexOf(page) > -1;
}

router.beforeEach((to, from, next) => {
    if (auth.isAuthenticated()) {
        if (to.path == path.loginUrl) {
            next(path.homeUrl);
        } else {
            next();
        }
    } else {
        auth.logout();
        // case user un authenticate
        if (isPublicPage(to.path)) {
            next();
        } else {
            next(path.loginUrl);
        }
    }
});