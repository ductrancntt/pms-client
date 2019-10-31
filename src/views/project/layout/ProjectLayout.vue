<template>
    <el-container direction="horizontal">
        <ProjectSidebar v-if="project != null" :project="project"/>
        <el-main class="row project-body">
            <transition name="fade" mode="out-in">
                <router-view>
                </router-view>
            </transition>
        </el-main>
    </el-container>
</template>

<script>
    import ProjectSidebar from "@/views/project/layout/ProjectSidebar";
    import ProjectService from "@/service/project.service";

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
