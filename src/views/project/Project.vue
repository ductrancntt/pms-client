<template>
    <el-container direction="horizontal" v-loading.fullscreen.lock="isLoading">
        <ProjectSidebar v-if="project != null" :project="project"/>
        <el-main class="row project-body">
            <router-view>
                <!--Content goes here-->
            </router-view>
        </el-main>
    </el-container>
</template>

<script>
    import ProjectSidebar from "@/views/project/ProjectSidebar";
    import ProjectService from "@/views/project/project.service";

    export default {
        name: "Project",
        components: {ProjectSidebar},
        created() {
            this.getProject();
        },
        data() {
            return {
                isLoading: true,
                project: null,
            }
        },
        methods: {
            getProject() {
                let vm = this;
                ProjectService.get(this.$route.params.id).then(data => {
                        vm.project = data;
                        vm.isLoading = false;
                    }
                );
            }
        }

    }
</script>

<style scoped>
    .project-body {
        margin-left: 200px;
        padding: 0;
    }
</style>
