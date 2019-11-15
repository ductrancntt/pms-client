<template>
    <div class="row v-center notification-item pointer" style="line-height: 1.5" :class="itemClass" >
        <div>
            <UserAvatar :user="userNotification.createdBy"/>
        </div>
        <div class="flex padding-left-10" @click="goToTarget">
            <span v-if="userNotification.notification.type === 'INVITE_TO_PROJECT'">
                <UsernameLink :is-router="false" :user="userNotification.createdBy"/> invite you to a project
            </span>
            <span v-if="userNotification.notification.type === 'ASSIGN_TASK'">
                <UsernameLink :is-router="false" :user="userNotification.createdBy"/> added you to a task
            </span>
            <span v-if="userNotification.notification.type === 'COMMENT'">
                <UsernameLink :is-router="false" :user="userNotification.createdBy"/> comment on a task you're following
            </span>
            <span v-if="userNotification.notification.type === 'ATTACHMENT'">
                <UsernameLink :is-router="false" :user="userNotification.createdBy"/> add attachment on a task you're in
            </span>
            <span v-if="userNotification.notification.type === 'ADD_SUB_TASK'">
                <UsernameLink :is-router="false" :user="userNotification.createdBy"/> add sub task on a task you're in
            </span>
        </div>
        <TaskDrawer v-if="hasTask" v-bind="taskDrawer"
                    ref="drawer"/>
    </div>
</template>

<script>
    import UserAvatar from "@/components/UserAvatar";
    import UsernameLink from "@/components/UsernameLink";
    import UserNotificationService from "@/service/user-notification.service";
    import TaskDrawer from "@/components/task/TaskDrawer";
    import TaskService from "@/service/task.service";

    export default {
        name: "NotificationItem",
        components: {TaskDrawer, UsernameLink, UserAvatar},
        props: {
            userNotification: Object
        },
        computed: {
            itemClass(){
                if (this.data == null) return '';
                return this.data.status === "SEEN" ? '' : 'unseen';
            }
        },
        data() {
            return {
                data: null,
                hasTask: false,
                taskDrawer: null,
            }
        },
        created() {
            this.data = this.userNotification;
            if (this.data.notification.type !== 'INVITE_TO_PROJECT'){
                this.loadData();
            }
        },
        methods: {
            loadData(){
                let vm = this;
                TaskService.getTaskDrawer(vm.userNotification.notification.target).then(response => {
                    vm.taskDrawer = {
                        taskId: response.taskId,
                        projectId: response.projectId,
                        isArchived: response.archived,
                        isManager: response.manager,
                    }
                    vm.hasTask = true;
                })
            },
            goToTarget(){
                let vm = this;
                switch (vm.userNotification.notification.type) {
                    case 'INVITE_TO_PROJECT':
                        vm.$router.push({name: 'userInvitation'});
                        break;
                    case 'ASSIGN_TASK':
                        vm.$refs.drawer.show();
                        break;
                    case 'COMMENT':
                        vm.$refs.drawer.show();
                        break;
                    case 'ATTACHMENT':
                        vm.$refs.drawer.show();
                        break;
                }
                UserNotificationService.userSeenNotification(vm.userNotification.notificationId).then(response => {
                    vm.data.status = 'SEEN';
                })
            }
        }
    }
</script>

<style scoped>
    .notification-item {
        padding: 10px 20px;
    }
    .unseen{
        background-color: #eee;
    }
</style>