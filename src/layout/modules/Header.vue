<template>
    <el-header class="row v-center custom-header" height="50px">
        <div class="row flex v-center">
            <img @click="navigateTo('home')" src="../../assets/images/logo.png"
                 style="cursor: pointer; width: 36px; height: 36px;"/>
            <h1 @click="navigateTo('home')" class="header-title">&nbsp;PMS</h1>
        </div>
        <div class="row flex-2">
            <el-row class="row flex h-center">
                <el-col :span="16">
<!--                    <el-input placeholder="Search" size="small">-->
<!--                        <i class="el-input__icon el-icon-search" slot="prefix"></i>-->
<!--                    </el-input>-->
                </el-col>
            </el-row>
        </div>
        <div class="row flex v-center align-right">
            <div class="padding-right-40">
                <el-dropdown trigger="click">
                    <el-badge :hidden="!hasNewNotification" class="el-dropdown-link" is-dot>
                        <el-button circle class="text-white" icon="el-icon-message-solid"
                                   style="font-size: 16pt; padding: 8px" type="text"></el-button>
                    </el-badge>
                    <el-dropdown-menu class="notification" slot="dropdown">
                        <el-dropdown-item class="notification-item padding-10" v-if="notifications.length == 0">
                            You have no notification!
                        </el-dropdown-item>
                        <el-dropdown-item :key="notif.notificationId" class="notification-item"
                                          v-for="notif in notifications">
                            <NotificationItem :user-notification="notif"/>
                        </el-dropdown-item>
                        <el-dropdown-item class="row h-center">
                            <el-button :disabled="notifications.length == 0" type="text"><span
                                    style="font-weight: bold;">Mark all as read!</span></el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <UserAvatar :show-tooltip="false" :user="user"/>
            <el-dropdown class="padding-left-10" trigger="click">
                <el-button class="el-dropdown-link text-white" type="text">
                    <span>{{user.firstName}} {{user.lastName}}</span>
                    <i class="el-icon-arrow-down"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="navigateTo('userProject')" class="padding-left-10 padding-right-10">My Project
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="navigateTo('userInvitation')" class="padding-left-10 padding-right-10">My Invitation
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="navigateTo('profile')" class="padding-left-10 padding-right-10">My Profile
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="navigateTo('changePassword')" class="padding-left-10 padding-right-10">Change Password
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="navigateTo('loginPage')" class="padding-left-10 padding-right-10">Logout
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </el-header>
</template>

<script>
    import Auth from "@/service/auth.service";
    import {bus} from "@/main";
    import UserAvatar from "@/components/UserAvatar";
    import UserNotificationService from "@/service/user-notification.service";
    import NotificationItem from "@/components/notification/NotificationItem";

    export default {
        name: "Header",
        components: {NotificationItem, UserAvatar},
        data() {
            return {
                user: Auth.getCurrentUser() ? Auth.getCurrentUser() : {},
                notifications: [],
                hasNewNotification: false,
            }
        },
        created() {
            let vm = this;
            bus.$on("updateAccount", function () {
                vm.user = Auth.getCurrentUser();
            });
            vm.loadData();
        },
        methods: {
            navigateTo(routeName) {
                if (routeName === 'loginPage') Auth.logout();
                this.$router.push({name: routeName});
            },
            loadData() {
                let vm = this;
                UserNotificationService.getByUser().then(response => {
                    vm.notifications = response;
                    vm.notifications.forEach(notif => {
                        if (notif.status === 'UNSEEN') vm.hasNewNotification = true;
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .header-title {
        letter-spacing: 2px;
        cursor: pointer;
        font-weight: 700;
        font-size: 18pt
    }

    .custom-header {
        color: white !important;
        background-color: #026aa7 !important;
    }

    .notification-item {
        display: flex;
        align-items: center;
        border-bottom: 0.5px solid #ccc;
        /*padding: 10px;*/
    }

    /deep/ .el-badge__content.is-fixed {
        top: 10px;
    }

    /deep/ .el-dropdown-menu {
        width: 200px;
        max-width: 250px;
        max-height: 600px;
        overflow-y: auto;
        padding: 0 !important;
    }

    /deep/ .el-dropdown-menu__item {
        padding: 0;
    }

    .notification {
        max-width: 300px;
        max-height: 400px;
        overflow-y: auto;
        padding: 0;
    }
</style>
