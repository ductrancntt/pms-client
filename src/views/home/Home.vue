<template>
    <div class="column flex padding-20">
        <el-row class="padding-bottom-20" justify="end" type="flex">
            <el-button @click="createProject" style="font-size: 14pt; padding: 10px 15px" type="primary">
                <el-icon name="circle-plus"></el-icon>
                New Project
            </el-button>
        </el-row>
        <el-row :gutter="20" class="row flex padding-bottom-20">
            <el-col :span="8" class="flex">
                <el-card :body-style="cardStyle" shadow="never">
                    <div slot="header">
                        <span>My Tasks</span>
                    </div>
                    <div>

                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="flex">
                <el-card :body-style="cardStyle" shadow="never">
                    <div slot="header">
                        <span>Notification</span>
                    </div>
                    <div>

                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="flex">
                <el-card :body-style="cardStyle" shadow="never">
                    <div slot="header">
                        <span>Project</span>
                    </div>
                    <div class="flex column">
                        <ul class="list">
                            <li :key="project.id" class="list-item" v-for="project in listProject">
                                <el-link @click="goToProject(project)">{{project.name}}</el-link>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row>
            <el-card shadow="never">
                <FullCalendar :plugins="calendarPlugins" defaultView="dayGridMonth"/>
            </el-card>
        </el-row>
        <ProjectDialog @projectSaved="loadProject" ref="projectDialog"/>
    </div>
</template>

<script>
    import ProjectDialog from "@/components/project/ProjectDialog";
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import UserProjectService from "@/service/user-project.service";
    import AlertService from "@/service/alert.service";

    export default {
        name: "Home",
        components: {ProjectDialog, FullCalendar},
        data() {
            return {
                calendarPlugins: [dayGridPlugin],
                listProject: [],
                cardStyle: {
                    'min-height': '360px',
                    'overflow': 'auto',
                    'max-height': '360px',
                }
            }
        },
        created() {
            this.loadProject();
        },
        methods: {
            goToProject(project) {
                this.$router.push({name: 'project', params: {id: project.id}});
            },
            createProject() {
                this.$refs.projectDialog.show();
            },
            loadProject() {
                let vm = this;
                UserProjectService.getProjectByCurrentUser().then(response => {
                    vm.listProject = response;
                }).catch(error => AlertService.error(error.message));
            }
        }
    }
</script>

<style scoped>
    .list {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        background: #e8f3fe;
        margin-bottom: 10px;
        color: #7dbcfc
    }
</style>
