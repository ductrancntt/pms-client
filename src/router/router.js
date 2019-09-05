import Vue from "vue"
import Router from "vue-router"
import paths from "./path"
import Home from "@/views/home/Home"
import Login from "@/views/login/Login"
import Register from "@/views/register/Register"
import Layout from "@/layout/Layout";
import Activate from "@/views/account/Activate";

Vue.use(Router);

const router = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            component: Layout,
            children: [
                {
                    path: paths.homeUrl,
                    name: 'homePage',
                    component: Home,
                    meta: {
                        title: "Home Page"
                    },
                },
            ]
        },
        {
            path: paths.loginUrl,
            name: 'loginPage',
            component: Login,
            meta: {
                title: "Login"
            },
        },
        {
            path: paths.registerUrl,
            name: 'registerPage',
            component: Register,
            meta: {
                title: "Register"
            },
        },
        {
            path: paths.account.activate,
            name: 'activatePage',
            component: Activate,
            meta: {
                title: "Account Activation"
            },
        },
    ]
});
router.afterEach((to, from) => {
    document.title = to.meta.title;
});

export default router;