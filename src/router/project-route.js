import ProjectMember from "@/views/project/manage/ProjectMember";
import ProjectTask from "@/views/project/manage/ProjectTask";
import ProjectResource from "@/views/project/manage/ProjectResource";
import ProjectManager from "@/views/project/manage/ProjectManager";
import ProjectSetting from "@/views/project/manage/ProjectSetting";
import ProjectArchived from "@/views/project/manage/ProjectArchived";
import ProjectStatistic from "@/views/project/manage/ProjectStatistic";

const ProjectRoutes = [
    {
        path: 'task',
        name: 'projectTask',
        component: ProjectTask,
        meta: {
            title: "Project Task",
            authorities: ['ROLE_USER']
        },
    },
    {
        path: 'member',
        name: 'projectMember',
        component: ProjectMember,
        meta: {
            title: "Project Member",
            authorities: ['ROLE_USER']
        },
    },
    {
        path: 'resource',
        name: 'projectResource',
        component: ProjectResource,
        meta: {
            title: "Project Resource",
            authorities: ['ROLE_USER']
        },
    },
    {
        path: 'manager',
        name: 'projectManager',
        component: ProjectManager,
        meta: {
            title: "Project Manager",
            authorities: ['ROLE_USER']
        },
    },
    {
        path: 'archived',
        name: 'projectArchived',
        component: ProjectArchived,
        meta: {
            title: "Project Archived",
            authorities: ['ROLE_USER']
        },
    },
    {
        path: 'statistic',
        name: 'projectStatistic',
        component: ProjectStatistic,
        meta: {
            title: "Project Statistic",
            authorities: ['ROLE_USER']
        },
    },
    {
        path: 'setting',
        name: 'projectSetting',
        component: ProjectSetting,
        meta: {
            title: "Project Setting",
            authorities: ['ROLE_USER']
        },
    },
];

export default ProjectRoutes;
