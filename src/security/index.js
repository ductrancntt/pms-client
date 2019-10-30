import router from "@/router";
import AuthService from "@/service/auth.service";

router.beforeEach((to, from, next) => {
    if (!to.matched.length) {
        next('/not-found');
    }
    if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
        if (!AuthService.hasAuthority(to.meta.authorities)) {
            if (!AuthService.isAuthenticated()) {
                next('/login');
            } else {
                next('/forbidden');
            }
        } else {
            next();
        }
    } else {
        // no authorities, so just proceed
        next();
    }
});
