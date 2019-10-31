import ProjectManagement from "@/views/project/manage/ProjectMangement";
import Project from "@/views/project/layout/ProjectLayout";
import Home from "@/views/home/Home";
import Profile from "@/views/account/profile/Profile";
import ProjectRoutes from "@/router/project-route";

const PrivateRoutes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: "Home Page",
            authorities: ['ROLE_USER']
        },
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            title: "Profile",
            authorities: ['ROLE_USER']
        },
    },
    {
        path: '/project-management',
        name: 'projectManagement',
        component: ProjectManagement,
        meta: {
            title: "Project Management",
            authorities: ['ROLE_ADMIN']
        },
    },
    {
        path: '/project/:id',
        name: 'project',
        component: Project,
        meta: {
            title: "Project",
            authorities: ['ROLE_USER']
        },
        redirect: {name: 'projectContent'},
        children: [
            ...ProjectRoutes
        ]
    }
];

export default PrivateRoutes;
