<template>
    <div class="width-100 padding-20 column flex">
        <div class="column flex">
            <div class="flex">
                <div class="row">
                    <div class="column flex">
                        <div class="row">
                            <div class="flex">
                                <div>
                                    <el-tag>
                                        <div style="font-weight: 500">{{project.name}}</div>
                                    </el-tag>
                                </div>
                            </div>
                            <el-button @click="editProject" plain size="mini" type="primary">Edit</el-button>
                            <ProjectDialog @projectSaved="loadData" ref="projectDialog"/>
                        </div>
                        <div class="flex padding-top-10">
                            <el-card shadow="never">
                                <div>
                                    <span style="white-space: pre-wrap">{{project.description}}</span>
                                </div>
                            </el-card>
                        </div>
                    </div>
                </div>
                <div class="padding-bottom-10 padding-top-10" v-if="project && isManager">
                    <el-tag>
                        <el-switch @change="toggleVerification" v-model="project.verifyTask">
                        </el-switch>
                        Task Verification
                    </el-tag>
                </div>
            </div>
            <div>
                <el-button @click="leaveProject" type="danger">
                    <i class="el-icon-upload2" style="transform: rotate(90deg)"></i>
                    Leave Project
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import UserProjectService from "@/service/user-project.service";
    import AuthService from "@/service/auth.service";
    import AlertService from "@/service/alert.service";
    import ProjectService from "@/service/project.service";
    import ProjectDialog from "@/components/project/ProjectDialog";

    export default {
        name: "ProjectSetting",
        components: {ProjectDialog},
        props: {
            projectId: Number,
            isManager: Boolean,
        },
        data() {
            return {
                project: null,
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            editProject() {
                this.$refs.projectDialog.edit(JSON.parse(JSON.stringify(this.project)));
            },
            loadData() {
                let vm = this;
                ProjectService.get(vm.projectId).then(response => {
                    vm.project = response;
                })
            },
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
            },
            toggleVerification(value) {
                let vm = this;
                if (value) {
                    ProjectService.turnOnVerification(vm.projectId).then().catch(error => AlertService.error(error.message))
                } else {
                    ProjectService.turnOffVerification(vm.projectId).then().catch(error => AlertService.error(error.message))
                }
            }
        }
    }
</script>

<style scoped>

</style>
