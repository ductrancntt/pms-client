<template>
    <div style="margin: 5px">
        <el-card shadow="never" style="cursor: pointer;" :body-style="bodyStyle" @click.native="showDrawer">
            <div class="column">
                <div class="flex" style="margin: 0 0 4px; text-align: justify">
                    <span>{{task.pos}} - {{task.name}}</span>
                </div>
                <div class="row">
                    <div class="row flex" style="align-items: flex-end">
                        <el-tooltip v-if="task.priority === 'NONE'" effect="dark" content="None" placement="bottom">
                            <el-button style="" class="padding-0 priority-button"></el-button>
                        </el-tooltip>
                        <el-tooltip v-else-if="task.priority === 'LOW'" effect="dark" content="Low" placement="bottom">
                            <el-button type="success" class="padding-0 priority-button"></el-button>
                        </el-tooltip>
                        <el-tooltip v-else-if="task.priority === 'MEDIUM'" effect="dark" content="Medium"
                                    placement="bottom">
                            <el-button type="primary" class="padding-0 priority-button"></el-button>
                        </el-tooltip>
                        <el-tooltip v-else-if="task.priority === 'HIGH'" effect="dark" content="High"
                                    placement="bottom">
                            <el-button type="warning" class="padding-0 priority-button"></el-button>
                        </el-tooltip>
                        <el-tooltip v-else effect="dark" content="Very High" placement="bottom">
                            <el-button type="danger" class="padding-0 priority-button"></el-button>
                        </el-tooltip>
                    </div>
                    <div class="row">
                        <div v-for="user in task.users" :key="user.id" style="align-items: flex-end">
                            <UserAvatar style="padding-left: 3px" :size="25" shape="circle" :user="user"/>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <TaskDrawer :project-id="projectId" :task-id="task.id" :is-manager="isManager" @deleteTask="deleteTask"
                    ref="drawer"/>
    </div>
</template>

<script>
    import TaskDrawer from "@/components/task/TaskDrawer";
    import UserAvatar from "@/components/UserAvatar";

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
        data() {
            return {
                soonOverdueStyle: {
                    backgroundColor: 'rgb(250,247,190)'
                },
                overdueStyle: {
                    backgroundColor: 'rgb(253,190,179)'
                }
            }
        }
        ,
        methods: {
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
