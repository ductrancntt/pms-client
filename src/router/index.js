import Vue from "vue"
import Router from "vue-router"
import Layout from "@/layout/Layout";
import PrivateRoutes from "@/router/private-route";
import PublicRoutes from "@/router/public-route";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            component: Layout,
            children: [
                ...PrivateRoutes
            ]
        },
        ...PublicRoutes
    ]
});

router.afterEach((to, from) => {
    document.title = to.meta.title;
});

export default router;