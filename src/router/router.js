import Vue from "vue"
import Router from "vue-router"
import paths from "./path"
import Home from "@/views/home/Home"
import Login from "@/views/login/Login"
import Register from "@/views/register/Register"
import Layout from "@/layout/Layout";

Vue.use(Router);

const router = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            component: Layout,
            children: [
                {
                    path: paths.home,
                    name: 'home',
                    component: Home,
                    meta: {
                        title: "Home Page"
                    },
                },
            ]
        },
        {
            path: paths.login,
            name: 'login',
            component: Login,
            meta: {
                title: "Login"
            },
        },
        {
            path: paths.register,
            name: 'register',
            component: Register,
            meta: {
                title: "Register"
            },
        },
    ]
});
router.afterEach((to, from) => {
    document.title = to.meta.title;
});

export default router;