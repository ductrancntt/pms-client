import paths from "@/router/path";

export default [
    {
        path: paths.homeUrl,
        name: 'homePage',
        component: Home,
        meta: {
            title: "Home Page"
        },
    },
]