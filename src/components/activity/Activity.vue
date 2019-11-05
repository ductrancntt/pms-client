<template>
    <el-card class="no-border" shadow="never">
        <div class="row v-center">
            <div class="padding-right-10">
                <UserAvatar :user="activity.createdBy" />
            </div>
            <div class="flex">
                <UsernameLink :user="activity.createdBy" />&nbsp;
                <span v-if="activity.type === 'MOVE_TASK'">move task to <TaskStatus :text="activity.target" /> </span>
                <span v-else-if="activity.type === 'UPDATE_PROGRESS'">update progress to <el-tag size="small">{{activity.target}}%</el-tag></span>
                <span v-else-if="activity.type === 'CHANGE_PRIORITY'">change priority to <TaskPriority :text="activity.target" /></span>
                <span v-else-if="activity.type === 'ADD_MEMBER'">add&nbsp;<UsernameLink :user="activity.target" />&nbsp; to this task.</span>
                <span v-else-if="activity.type === 'REMOVE_MEMBER'">remove&nbsp;<UsernameLink :user="activity.target" />&nbsp; from this task.</span>
                <span v-else v-html="activityContent"></span>
            </div>
            <div>
                <el-tag size="mini" type="info">{{activity.createdTime | moment("HH:mm - DD/MM/YYYY")}}</el-tag>
            </div>
        </div>
    </el-card>
</template>

<script>
    import UserAvatar from "@/components/UserAvatar";
    import TaskStatus from "@/components/task/TaskStatus";
    import TaskPriority from "@/components/task/TaskPriority";
    import UsernameLink from "@/components/UsernameLink";
    export default {
        name: "Activity",
        components: {UsernameLink, TaskPriority, TaskStatus, UserAvatar},
        props: {
            activity: Object,
        },
        computed: {
            activityContent(){
                switch (this.activity.type) {
                    case 'CREATED':
                        return 'created this task.';
                    case 'JOIN_TASK':
                        return 'joined this task.';
                    case 'UPDATE_PROGRESS':
                        return 'update progress to ' + this.activity.target + '%';
                    case 'ADD_MEMBER':
                        return 'added ' + this.activity.target + " to this task";
                    case 'ADD_SUB_TASK':
                        return 'added ' + this.activity.target + " sub task(s)";
                    case 'CHECK_SUB_TASK':
                        return 'mark ' + this.activity.target + ' completed';
                    case 'UNCHECK_SUB_TASK':
                        return 'mark ' + this.activity.target + ' uncompleted';
                    case 'MOVE_TASK':
                        return 'move task to <el-tag>' + this.activity.target + '</el-tag>.';
                    case 'CHANGE_PRIORITY':
                        return 'change task priority to <el-tag>' + this.activity.target + '</el-tag>.';
                    default: return '';
                }
            }
        }
    }
</script>

<style scoped>
    .no-border {
        border: none!important;
    }
</style>
