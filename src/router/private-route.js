import ProjectManagement from "@/views/project/ProjectMangement";
import Project from "@/views/project/ProjectLayout";
import Home from "@/views/home/Home";
import ProjectContent from "@/views/project/components/ProjectContent";

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
        path: '/project-management',
        name: 'projectManagement',
        component: ProjectManagement,
        meta: {
            title: "Project Management",
            authorities: ['ROLE_USER']
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
            {
                path: '/project/:id',
                name: 'projectContent',
                component: ProjectContent,
                meta: {
                    title: "Project",
                    authorities: ['ROLE_USER']
                },
            }
        ]
    }
];

export default PrivateRoutes;
