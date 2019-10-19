<template>
    <el-header height="40px" class="row v-center custom-header">
        <div class="row flex">
            <h1>PMS</h1>
        </div>
        <div class="row flex-2">
            <el-row class="row flex h-center">
                <el-col :span="16">
                    <el-input size="mini" placeholder="Search">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div class="row flex v-center align-right">
            <el-avatar :size="30" :src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" @error="errorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            <el-dropdown trigger="click" class="padding-left-10">
                <el-button class="el-dropdown-link text-white" type="text">
                    <span >{{user.firstName}}&nbsp;</span>
                    <i class="el-icon-arrow-down"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>Profile</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">
                        <a>Logout</a>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </el-header>
</template>

<script>
    import Auth from "@/security/auth.service";

    export default {
        name: "Header",
        data() {
            return {
                user: Auth.getCurrentUser() ? Auth.getCurrentUser() : {}
            }
        },
        methods: {
            errorHandler() {
                return this.user.imageUrl == null;
            },
            logout() {
                Auth.logout();
                this.$router.push({name: 'loginPage'});
            }
        }
    }
</script>

<style scoped>
    .custom-header{
        color: white !important;
        background-color: #026aa7 !important;
    }
</style>
