<template>
    <div style="margin: 5px">
        <el-card v-loading="isLoading" shadow="never" style="cursor: pointer;" :body-style="bodyStyle"
                 @click.native="showDrawer">
            <div class="column no-wrap">
                <div class="flex" style="margin: 0 0 4px; text-align: justify">
                    <span>{{taskItem.name}}</span>
                </div>
                <div class="row no-wrap">
                    <div class="row align-bottom">
                        <!--                        <el-tooltip v-if="task.priority === 'NONE'" effect="dark" content="None" placement="bottom">-->
                        <!--                            <el-button style="" class="padding-0 priority-button"></el-button>-->
                        <!--                        </el-tooltip>-->
                        <el-tooltip v-if="taskItem.priority === 'LOW'" effect="dark" content="Low" placement="bottom">
                            <el-button type="success" class="padding-0 priority-button margin-right-5"></el-button>
                        </el-tooltip>
                        <el-tooltip v-else-if="taskItem.priority === 'MEDIUM'" effect="dark" content="Medium"
                                    placement="bottom">
                            <el-button type="primary" class="padding-0 priority-button margin-right-5"></el-button>
                        </el-tooltip>
                        <el-tooltip v-else-if="taskItem.priority === 'HIGH'" effect="dark" content="High"
                                    placement="bottom">
                            <el-button type="warning" class="padding-0 priority-button margin-right-5"></el-button>
                        </el-tooltip>
                        <el-tooltip v-else-if="taskItem.priority === 'VERY_HIGH'" effect="dark" content="Very High"
                                    placement="bottom">
                            <el-button type="danger" class="padding-0 priority-button margin-right-5"></el-button>
                        </el-tooltip>
                    </div>
                    <div class="row flex align-bottom" v-if="taskItem.status === 'IN_PROGRESS'">
                        <div v-if="taskItem.progress !== 0">
                            <el-tag size="mini">{{taskItem.progress}}%</el-tag>
                        </div>
                    </div>
                    <div class="row flex align-bottom align-right">
                        <div class="row align-bottom" v-if="taskItem.assignedUsers.length <= 2">
                            <div v-for="user in taskItem.assignedUsers" :key="user.id" style="align-items: flex-end">
                                <UserAvatar style="padding-left: 3px" :size="30" shape="circle" :user="user"/>
                            </div>
                        </div>
                        <div class="row align-bottom" v-else>
                            <div v-for="user in taskItem.assignedUsers.slice(0,2)" :key="user.id"
                                 style="align-items: flex-end">
                                <UserAvatar style="padding-left: 3px" :size="25" shape="circle" :user="user"/>
                            </div>
                            <el-tooltip effect="dark" placement="bottom"
                                        :content="(taskItem.assignedUsers.length - 2) + ' more'">
                                <span style="letter-spacing: 2px">...</span>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <TaskDrawer :project-id="projectId" :task-id="task.id" :is-manager="isManager" @taskUpdated="updateTask"
                    @deleteTask="deleteTask"
                    ref="drawer"/>
    </div>
</template>

<script>
    import TaskDrawer from "@/components/task/TaskDrawer";
    import UserAvatar from "@/components/UserAvatar";
    import TaskService from "@/service/task.service";

    export default {
        name: "TaskItem",
        components: {UserAvatar, TaskDrawer},
        props: {
            projectId: Number,
            isManager: {
                type: Boolean,
                required: true
            },
            task: {
                type: Object,
                required: true
            }
        },
        computed: {
            soonOverdue() {
                if (this.task.estimateEndDate != null && (this.task.status === 'NO_PROGRESS' || this.task.status === 'IN_PROGRESS')) {
                    let date1 = new Date(this.task.estimateEndDate);
                    let date2 = new Date();
                    if (date1.getTime() - date2.getTime() < 1000 * 60 * 24) return true;
                    return false;
                }
                return false;
            },
            bodyStyle() {
                if (this.task.estimateEndDate != null && (this.task.status === 'NO_PROGRESS' || this.task.status === 'IN_PROGRESS')) {
                    let date1 = new Date(this.task.estimateEndDate);
                    let date2 = new Date();
                    if (date1.getTime() - date2.getTime() < 0) return this.overdueStyle;
                }
                if (this.task.overdue) return this.overdueStyle;
                if (this.soonOverdue) return this.soonOverdueStyle;
                return {};
            }
        },
        created() {
            this.taskItem = this.task;
        },
        data() {
            return {
                isLoading: false,
                taskItem: {
                    assignedUsers: []
                },
                soonOverdueStyle: {
                    backgroundColor: 'rgb(250,247,190)'
                },
                overdueStyle: {
                    backgroundColor: 'rgb(253,190,179)'
                }
            }
        },
        methods: {
            updateTask() {
                let vm = this;
                vm.isLoading = true;
                TaskService.get(vm.taskItem.id).then(response => {
                    vm.taskItem = response;
                    vm.isLoading = false;
                    Object.keys(vm.task).forEach(key => {
                        vm.$set(vm.taskItem, key, response[key]);
                    });
                    vm.$emit("taskChange", response);
                });
            },
            showDrawer() {
                this.$refs.drawer.show();
            },
            deleteTask() {
                this.$emit("taskDeleted");
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-card__body {
        padding: 10px 10px 6px;
    }

    .priority-button {
        border-radius: 50%;
        width: 20px;
        height: 20px;
    }

    .overdue-button {
        text-transform: uppercase;
        font-size: 8pt;
        padding: 3px;
        height: 20px;
    }
</style>
