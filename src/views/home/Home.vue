<template>
    <div class="column flex padding-20">
        <el-row class="padding-bottom-20 row v-center">
            <div class="flex">
                <el-tag style="font-weight: bold" type="primary">{{ new Date() | moment("dddd, MMMM Do YYYY") }}
                </el-tag>
            </div>
            <el-button @click="createProject" style="font-size: 14pt; padding: 10px 15px" type="primary">
                <el-icon name="circle-plus"></el-icon>
                New Project
            </el-button>
        </el-row>
        <el-row :gutter="20" class="row flex padding-bottom-20">
            <el-col :span="8" class="flex">
                <el-card :body-style="cardStyle" shadow="never">
                    <div slot="header">
                        <div class="row padding" style="height: 30px">
                            <span class="flex" style="font-weight: bold">Notes</span>
                            <el-button @click="createNote" circle icon="el-icon-plus" size="mini" type="primary"></el-button>
                        </div>
                    </div>
                    <div class="column flex v-center h-center" v-if="listNote.length === 0">
                        <i class="el-icon-notebook-1 icon-class"></i>
                    </div>
                    <div class="flex column" v-else>
                        <div>
                            <NoteItem @itemUpdated="loadNote" :key="note.id" v-for="note in listNote" :item="note"/>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="flex">
                <el-card :body-style="cardStyle" shadow="never">
                    <div slot="header">
                        <div style="height: 30px">
                            <span style="font-weight: bold">Recent Tasks</span>
                        </div>
                    </div>

                    <div class="column flex v-center h-center" v-if="listTask.length === 0">
                        <i class="el-icon-finished icon-class"></i>
                    </div>
                    <div class="flex column" v-else>
                        <div>
                            <TaskItem :is-manager="task.manager"
                                      :key="task.taskDto.id"
                                      :project-id="task.projectId"
                                      :task="task.taskDto"
                                      @taskChange="loadTask"
                                      @taskDeleted="loadTask"
                                      class="list-group-item"
                                      custom-class="gray"
                                      v-for="task in listTask"/>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="flex">
                <el-card :body-style="cardStyle" shadow="never">
                    <div slot="header">
                        <div style="height: 30px">
                            <span style="font-weight: bold">Recent Projects</span>
                        </div>
                    </div>
                    <div class="column flex v-center h-center" v-if="listProject.length === 0">
                        <i class="el-icon-folder-checked icon-class"></i>
                    </div>
                    <div class="flex column" v-else>
                        <ul class="list">
                            <li :key="project.id" @click="goToProject(project)" class="list-item pointer"
                                v-for="project in listProject">
                                <el-link>{{project.name}}</el-link>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <ProjectDialog @projectSaved="loadProject" ref="projectDialog"/>
        <NoteDialog @noteSaved="loadNote" ref="noteDialog"/>
    </div>
</template>

<script>
    import ProjectDialog from "@/components/project/ProjectDialog";
    import dayGridPlugin from '@fullcalendar/daygrid'
    import ProjectLogService from "@/service/project-log.service";
    import TaskLogService from "@/service/task-log.service";
    import TaskItem from "@/components/task/TaskItem";
    import UserNotificationService from "@/service/user-notification.service";
    import NoteDialog from "@/components/note/NoteDialog";
    import NoteService from "@/service/note.service";
    import NoteItem from "@/components/note/NoteItem";

    export default {
        name: "Home",
        components: {NoteItem, NoteDialog, TaskItem, ProjectDialog},
        data() {
            return {
                calendarPlugins: [dayGridPlugin],
                listProject: [],
                listTask: [],
                listNotification: [],
                listNote: [],
                cardStyle: {
                    'display': 'flex',
                    'min-height': '360px',
                    'overflow': 'auto',
                    'max-height': '360px',
                    // 'border': '3px dashed #aaa',
                    // 'border-top-width': '0',
                    // 'background': '#e7eaf0',
                    'padding': '10px',
                    'margin-bottom': '30px'
                }
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            goToProject(project) {
                this.$router.push({name: 'project', params: {id: project.id}});
            },
            createNote() {
                this.$refs.noteDialog.show();
            },
            createProject() {
                this.$refs.projectDialog.show();
            },
            loadProject() {
                let vm = this;
                ProjectLogService.getRecentProject().then(response => {
                    vm.listProject = response;
                });
            },
            loadNote() {
                let vm = this;
                NoteService.getAll().then(response => {
                    vm.listNote = response;
                })
            },
            loadNotification() {
                let vm = this;
                UserNotificationService.getUnseenNotification().then(response => {
                    vm.listNotification = response;
                })
            },
            loadTask() {
                let vm = this;
                TaskLogService.getRecentTask().then(response => {
                    console.log(response);
                    vm.listTask = response;
                })
            },
            loadData() {
                let vm = this;
                vm.loadProject();
                vm.loadNotification();
                vm.loadTask();
                vm.loadNote();
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
        background: #eee;
        /*background: #e8f3fe;*/
        margin-bottom: 5px;
        color: #7dbcfc
    }

    .icon-class {
        font-size: 100pt;
        color: #aaa
    }

</style>
