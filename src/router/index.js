import Vue from "vue"
import Router from "vue-router"
import Layout from "@/layout/Layout";
import ChildRoutes from "@/router/child-route";
import CommonRoutes from "@/router/common-route";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            component: Layout,
            children: [
                ...ChildRoutes
            ]
        },
        ...CommonRoutes
    ]
});

router.afterEach((to, from) => {
    document.title = to.meta.title;
});

export default router;