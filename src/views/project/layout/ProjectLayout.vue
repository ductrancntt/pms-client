<template>
    <el-container direction="horizontal">
        <ProjectSidebar v-if="project != null" :project="project"/>
        <el-main class="row project-body">
            <router-view>
                <ProjectContent/>
            </router-view>
        </el-main>
    </el-container>
</template>

<script>
    import ProjectSidebar from "@/views/project/layout/ProjectSidebar";
    import ProjectService from "@/service/project.service";
    import ProjectContent from "@/views/project/layout/ProjectContent";

    export default {
        name: "Project",
        components: {ProjectContent, ProjectSidebar},
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
