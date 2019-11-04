<template>
    <el-header height="50px" class="row v-center custom-header">
        <div class="row flex v-center">
            <img @click="navigateTo('home')" style="cursor: pointer; width: 36px; height: 36px;" src="../../assets/images/logo.png"/>
            <h1 @click="navigateTo('home')" class="header-title">&nbsp;PMS</h1>
        </div>
        <div class="row flex-2">
            <el-row class="row flex h-center">
                <el-col :span="16">
                    <el-input size="small" placeholder="Search">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div class="row flex v-center align-right">
            <div class="padding-right-40">
                <el-dropdown trigger="click">
                    <el-badge is-dot class="el-dropdown-link">
                        <el-button style="font-size: 16pt; padding: 8px" class="text-white" type="text"
                                   icon="el-icon-message-solid" circle></el-button>
                    </el-badge>
                    <el-dropdown-menu slot="dropdown" class="notification">
                        <el-dropdown-item class="notification-item" v-for="notif in notifications" :key="notif.id">
                            <span>{{notif.content}}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <UserAvatar :user="user" :show-tooltip="false"/>
            <el-dropdown trigger="click" class="padding-left-10">
                <el-button class="el-dropdown-link text-white" type="text">
                    <span>{{user.firstName}} {{user.lastName}}</span>
                    <i class="el-icon-arrow-down"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="navigateTo('userProject')">My Project</el-dropdown-item>
                    <el-dropdown-item @click.native="navigateTo('userInvitation')">My Invitation</el-dropdown-item>
                    <el-dropdown-item @click.native="navigateTo('profile')">My Profile</el-dropdown-item>
                    <el-dropdown-item @click.native="navigateTo('changePassword')">Change Password</el-dropdown-item>
                    <el-dropdown-item @click.native="navigateTo('loginPage')">Logout</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </el-header>
</template>

<script>
    import Auth from "@/service/auth.service";
    import {bus} from "@/main";
    import UserAvatar from "@/components/UserAvatar";

    export default {
        name: "Header",
        components: {UserAvatar},
        data() {
            return {
                user: Auth.getCurrentUser() ? Auth.getCurrentUser() : {},
                notifications: [
                    {
                        id: 1,
                        content: "This is test text!!! This is test text!!! This is test text!!!"
                    },
                    {
                        id: 2,
                        content: "This is test text!!!"
                    },
                    {
                        id: 3,
                        content: "This is test text!!!"
                    },
                    {
                        id: 4,
                        content: "This is test text!!!"
                    },
                    {
                        id: 5,
                        content: "This is test text!!!"
                    },
                    {
                        id: 6,
                        content: "This is test text!!!"
                    },
                    {
                        id: 7,
                        content: "This is test text!!!"
                    },
                    {
                        id: 8,
                        content: "This is test text!!!"
                    },
                    {
                        id: 9,
                        content: "This is test text!!!"
                    },
                    {
                        id: 10,
                        content: "This is test text!!!"
                    },
                    {
                        id: 11,
                        content: "This is test text!!!"
                    },
                    {
                        id: 12,
                        content: "This is test text!!!"
                    },
                ]
            }
        },
        created() {
            let vm = this;
            bus.$on("updateAccount", function () {
                vm.user = Auth.getCurrentUser();
            })
        },
        methods: {
            navigateTo(routeName) {
                if (routeName === 'loginPage') Auth.logout();
                this.$router.push({name: routeName});
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
        border-bottom: 1px solid #eee;
        padding: 10px;
    }

    /deep/ .el-badge__content.is-fixed {
        top: 10px;
    }

    /deep/ .el-dropdown-menu {
        width: 200px;
        max-width: 250px;
        max-height: 600px;
        overflow-y: auto;
    }

    .notification {
        max-width: 300px;
        max-height: 400px;
        overflow-y: auto;
    }
</style>
