<template>
    <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Profile</el-dropdown-item>
                <el-dropdown-item>Setting</el-dropdown-item>
                <el-dropdown-item @click.native="logout">
                    <a>Logout</a>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>{{user.firstName}} {{user.lastName}}</span>
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
            logout() {
                Auth.logout();
                this.$router.push({name: 'loginPage'});
            }
        }
    }
</script>

<style scoped>

</style>