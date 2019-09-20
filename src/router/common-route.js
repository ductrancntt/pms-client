import Login from "@/views/public/login/Login"
import Register from "@/views/public/register/Register"
import Activate from "@/views/account/activate/Activate";
import Error from "@/views/public/error/Error";

const CommonRoutes = [
    {
        path: '/login',
        name: 'loginPage',
        component: Login,
        meta: {
            title: "Login"
        },
    },
    {
        path: '/register',
        name: 'registerPage',
        component: Register,
        meta: {
            title: "Register"
        },
    },
    {
        path: '/activate',
        name: 'activatePage',
        component: Activate,
        meta: {
            title: "Account Activation"
        },
    },
    {
        path: '/forbidden',
        name: 'forbiddenPage',
        component: Error,
        meta: {
            title: "Error",
            error403: true,
        },
    },
    {
        path: '/not-found',
        name: 'notFoundPage',
        component: Error,
        meta: {
            title: "Error",
            error404: true,
        },
    }
];

export default CommonRoutes;