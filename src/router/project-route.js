import ProjectMember from "@/views/project/manage/ProjectMember";
import ProjectContent from "@/views/project/layout/ProjectContent";

const ProjectRoutes = [
    {
        path: '/project/:id',
        name: 'projectContent',
        component: ProjectContent,
        meta: {
            title: "Project",
            authorities: ['ROLE_USER']
        },
    },
    {
        path: '/member',
        name: 'projectMember',
        component: ProjectMember,
        meta: {
            title: "Project Member",
        },
    }
];

export default ProjectRoutes;