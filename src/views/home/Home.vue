<template>
    <div class="column flex padding-20">
        <el-row type="flex" justify="end" class="padding-bottom-20">
            <el-button style="font-size: 14pt; padding: 10px 15px" type="primary" @click="createProject">
                <el-icon name="circle-plus"></el-icon>
                New Project
            </el-button>
        </el-row>
        <el-row class="row flex padding-bottom-20" :gutter="20">
            <el-col :span="8" class="flex">
                <el-card shadow="never" :body-style="cardStyle">
                    <div slot="header">
                        <span>My Tasks</span>
                    </div>
                    <div>

                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="flex">
                <el-card shadow="never" :body-style="cardStyle">
                    <div slot="header">
                        <span>Notification</span>
                    </div>
                    <div>

                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="flex">
                <el-card shadow="never" :body-style="cardStyle">
                    <div slot="header">
                        <span>Project</span>
                    </div>
                    <div class="flex column">
                        <ul class="list">
                            <li class="list-item" v-for="project in listProject" :key="project.id">
                                <el-link @click="goToProject(project)">{{project.name}}</el-link>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row>
            <el-card shadow="never">
                <FullCalendar defaultView="dayGridMonth" :plugins="calendarPlugins"/>
            </el-card>
        </el-row>
        <ProjectDialog ref="projectDialog" @projectSaved="loadProject"/>
    </div>
</template>

<script>
    import ProjectDialog from "@/views/project/components/ProjectDialog";
    import FullCalendar from '@fullcalendar/vue'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import ProjectService from "@/views/project/project.service";

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
                ProjectService.getAll().then(response => {
                    vm.listProject = response;
                })
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
