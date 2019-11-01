<template>
    <el-container direction="horizontal" v-loading="isLoading">
        <ProjectSidebar v-if="isManager != null"
                        :project-id="projectId"
                        :is-manager="isManager"
                        @toggleSidebar="toggleSidebar"/>
        <el-main class="row"
                 :class="collapse ? 'project-body-short' : 'project-body-long'"
                 v-if="isManager != null">
            <transition name="fade" mode="out-in">
                <router-view :project-id="projectId"
                             :is-manager="isManager">
                </router-view>
            </transition>
        </el-main>
    </el-container>
</template>

<script>
    import ProjectSidebar from "@/views/project/layout/ProjectSidebar";
    import ProjectService from "@/service/project.service";

    export default {
        name: "ProjectLayout",
        components: {ProjectSidebar},
        created() {
            this.getProject();
        },
        data() {
            return {
                collapse: false,
                isLoading: true,
                isManager: null,
                projectId: null,
            }
        },
        methods: {
            toggleSidebar(status) {
                this.collapse = status;
            },
            getProject() {
                let vm = this;
                vm.projectId = parseInt(vm.$route.params.id);
                ProjectService.checkProjectAdmin(vm.projectId).then(response => {
                    vm.isLoading = false;
                    if (response === true) vm.isManager = true;
                    if (response.data === false) vm.isManager = false;
                });
            }
        }

    }
</script>

<style scoped>
    .project-body-long {
        margin-left: 200px;
        padding: 0;
    }

    .project-body-short {
        margin-left: 64px;
        padding: 0;
    }
</style>
