<template>
    <div class="width-100 padding-20">
        <el-button type="danger" @click="leaveProject">
            <i style="transform: rotate(90deg)" class="el-icon-upload2"></i>
            Leave Project
        </el-button>
    </div>
</template>

<script>
    import UserProjectService from "@/service/user-project.service";
    import AuthService from "@/service/auth.service";
    import AlertService from "@/service/alert.service";

    export default {
        name: "ProjectSetting",
        props: {
            projectId: Number,
        },
        methods: {
            leaveProject() {
                let vm = this;
                AlertService.confirm("Leave this project?", function () {
                    UserProjectService.deleteMember({
                        userId: AuthService.getCurrentUser().id,
                        projectId: vm.projectId,
                    })
                        .then(res => vm.$router.push({name: 'home'}))
                        .catch(error => AlertService.error(error.message));
                });
            }
        }
    }
</script>

<style scoped>

</style>
