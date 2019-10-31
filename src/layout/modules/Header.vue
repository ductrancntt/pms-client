<template>
    <el-header height="50px" class="row v-center custom-header">
        <div class="row flex">
            <h1 @click="home" style="cursor: pointer">PMS</h1>
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
            <UserAvatar :image-url="user.imageUrl" :text="user.firstName" shape="circle" />
            <el-dropdown trigger="click" class="padding-left-10">
                <el-button class="el-dropdown-link text-white" type="text">
                    <span>{{user.firstName}}&nbsp;</span>
                    <i class="el-icon-arrow-down"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="profile">Profile</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">
                        <a>Logout</a>
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
            logout() {
                Auth.logout();
                this.$router.push({name: 'loginPage'});
            },
            profile() {
                this.$router.push({name: 'profile'});
            },
            home() {
                this.$router.push({name: 'home'});
            }
        }
    }
</script>

<style scoped>
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
