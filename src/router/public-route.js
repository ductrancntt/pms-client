import Login from "@/views/public/login/Login"
import Register from "@/views/public/register/Register"
import Activate from "@/views/public/activate/Activate";
import Error from "@/views/public/error/Error";
import ResetInit from "@/views/public/reset/ResetInit";
import ResetFinish from "@/views/public/reset/ResetFinish";

const PublicRoutes = [
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
        path: '/reset-init',
        name: 'resetInitPage',
        component: ResetInit,
        meta: {
            title: "Password Reset"
        },
    },
    {
        path: '/reset-finish',
        name: 'resetFinishPage',
        component: ResetFinish,
        meta: {
            title: "Complete Password Reset"
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

export default PublicRoutes;
