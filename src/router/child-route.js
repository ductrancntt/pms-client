import Home from "@/views/home/Home"

const ChildRoutes = [
    {
        path: '/',
        name: 'homePage',
        component: Home,
        meta: {
            title: "Home Page",
            authorities: ['ROLE_USER']
        },
    },
];

export default ChildRoutes;