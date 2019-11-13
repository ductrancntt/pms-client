<template>
    <div class="row flex padding-10">
        <div class="column flex">
            <el-card class="flex" shadow="never">
                <div class="row h-center" slot="header">
                    <UserAvatar :is-router="false" :size="200" :user="user" v-if="user"/>
                </div>
                <div>
                    <table v-if="user" border="1" cellpadding="20" style="table-layout: fixed; width: 100%">
                        <tr>
                            <td>Full Name:</td>
                            <td>{{user.firstName}} {{user.lastName}}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{{user.email}}</td>
                        </tr>
                    </table>
                </div>
            </el-card>
        </div>
        <div class="column flex-3 padding-left-10">
            <el-divider content-position="left">
                <el-tag>Mutual Project</el-tag>
            </el-divider>
            <el-row :gutter="10">
                <el-col :span="8" v-for="project in projects" :key="project.id">
                    <ProjectCard :project="project" />
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import AccountService from "@/service/account.service";
    import UserAvatar from "@/components/UserAvatar";
    import UserProjectService from "@/service/user-project.service";
    import ProjectCard from "@/components/project/ProjectCard";

    export default {
        name: "UserInfo",
        components: {ProjectCard, UserAvatar},
        created() {
            this.loadData();
        },
        data() {
            return {
                user: null,
                projects: [],
            }
        },
        methods: {
            loadData() {
                let vm = this;
                AccountService.getUserInfo(vm.$route.params.username).then(response => vm.user = response);
                UserProjectService.getProjectByUsername(vm.$route.params.username).then(response => vm.projects = response);
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-divider__text {
        background-color: transparent;
    }
</style>