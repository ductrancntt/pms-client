<template>
    <div class="column flex padding-10">
        <div class="text-right padding-bottom-10">
            <el-button @click="createProject" type="primary">Create Project</el-button>
        </div>

        <div class="flex" v-if="projects && projects.managing.length > 0 || projects.member.length > 0">
            <el-divider content-position="left">
                <el-tag>Owned</el-tag>
            </el-divider>
            <el-row :gutter="20" class="row flex-wrap">
                <el-col :key="project.id" :span="8" style="padding-bottom: 20px" v-for="project in projects.managing">
                    <el-card shadow="never">
                        <div class="row v-center" slot="header">
                            <span @click="goToProject(project.id)" class="flex-1"
                                  style="cursor: pointer; font-weight: bold">{{project.name}}</span>

                            <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                            <i class="el-icon-s-tools el-icon--right"></i>
                          </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="editProject(project)" icon="el-icon-edit">Edit
                                    </el-dropdown-item>
                                    <!--                                    <el-dropdown-item @click.native="closeProject(project)" icon="el-icon-close">Close-->
                                    <!--                                    </el-dropdown-item>-->
                                    <el-dropdown-item @click.native="deleteProject(project)" icon="el-icon-delete">
                                        Delete
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div>
                            <span>{{project.description}}</span>
                        </div>
                    </el-card>
<!--                    <ProjectCard :project="project" />-->
                </el-col>
            </el-row>
            <el-divider content-position="left">
                <el-tag>Joined</el-tag>
            </el-divider>
            <el-row :gutter="20" class="row flex-wrap">
                <el-col :key="project.id" :span="8" style="padding-bottom: 20px" v-for="project in projects.member">
                    <el-card shadow="never">
                        <div class="row v-center" slot="header">
                            <span @click="goToProject(project.id)" class="flex-1">{{project.name}}</span>

                            <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                            <i class="el-icon-s-tools el-icon--right"></i>
                          </span>
                                <el-dropdown-menu slot="dropdown">
                                    <!--                                    <el-dropdown-item @click.native="editProject(project)" icon="el-icon-edit">Edit-->
                                    <!--                                    </el-dropdown-item>-->
                                    <!--                                    <el-dropdown-item @click.native="closeProject(project)" icon="el-icon-close">Close-->
                                    <!--                                    </el-dropdown-item>-->
                                    <el-dropdown-item @click.native="leaveProject(project)" icon="el-icon-delete">
                                        Leave
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div>
                            <span>{{project.description}}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <div v-else class="column flex v-center h-center">
            <i class="el-icon-folder-checked icon-class"></i>
            <p style="font-size: 16pt">You don't have any projects</p>
        </div>
        <ProjectDialog @projectSaved="loadProject" ref="projectDialog"/>
    </div>
</template>

<script>
    import ProjectDialog from "@/components/project/ProjectDialog";
    import ProjectService from "@/service/project.service";
    import AlertService from "@/service/alert.service";
    import SweetAlert from "@/service/sweet-alert.service";
    import UserProjectService from "@/service/user-project.service";
    import AuthService from "@/service/auth.service";
    import ProjectCard from "@/components/project/ProjectCard";

    export default {
        name: "UserProject",
        components: {ProjectCard, ProjectDialog},
        data() {
            return {
                projects: null,
            }
        },
        created() {
            this.loadProject();
        },
        methods: {
            goToProject(id) {
                this.$router.push({name: 'project', params: {id: id}});
            },
            createProject() {
                this.$refs.projectDialog.show();
            },
            loadProject() {
                let vm = this;
                UserProjectService.getOverviewByCurrentUser().then(response => {
                    console.log(response)
                    vm.projects = response;
                });
            },
            editProject(project) {
                console.log(project);
                this.$refs.projectDialog.edit(project);
            },
            closeProject(project) {
                let vm = this;
                let payload = JSON.parse(JSON.stringify(project));
                payload.closed = true;
                SweetAlert.confirm("Close project", "Confirm close " + payload.name + "!", function () {
                    ProjectService.update(payload).then(response => {
                        vm.loadProject();
                        AlertService.success("Close project successfully")
                    }).catch(error => AlertService.error(error.message));
                });
            },
            leaveProject(project) {
                let vm = this;
                AlertService.confirm("Leave this project?", function () {
                    UserProjectService.deleteMember({
                        userId: AuthService.getCurrentUser().id,
                        projectId: project.id,
                    })
                        .then(res => {
                            vm.loadProject();
                            AlertService.success("Leave project successfully")
                        })
                        .catch(error => AlertService.error(error.message));
                });
            },
            deleteProject(project) {
                let vm = this;
                AlertService.confirm("Delete this project?", function () {
                    ProjectService.delete(project.id).then(response => {
                        vm.loadProject();
                        AlertService.success("Delete successfully")
                    }).catch(error => AlertService.error(error.message));
                });
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-divider__text {
        background-color: transparent;
    }

    .icon-class {
        font-size: 100pt;
        color: #aaa
    }
</style>
