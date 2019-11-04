<template>
    <div>
        <el-row type="flex" justify="end" class="padding-bottom-20">
            <el-button type="primary" @click="createProject">Create Project</el-button>
        </el-row>
        <el-row class="row flex-wrap" :gutter="20">
            <el-col style="padding-bottom: 20px" :span="8" v-for="project in projects" :key="project.id">
                <el-card shadow="hover">
                    <div slot="header" class="row v-center">
                        <span class="flex-1" @click="goToProject(project.id)">{{project.name}}</span>

                        <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                            <i class="el-icon-s-tools el-icon--right"></i>
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="editProject(project)" icon="el-icon-edit">Edit
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="closeProject(project)" icon="el-icon-close">Close
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="deleteProject(project)" icon="el-icon-delete">Delete
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
        <ProjectDialog ref="projectDialog" @projectSaved="loadProject"/>
    </div>

</template>

<script>
    import ProjectDialog from "@/components/project/ProjectDialog";
    import ProjectService from "@/service/project.service";
    import AlertService from "@/service/alert.service";
    import SweetAlert from "@/service/sweet-alert.service";

    export default {
        name: "ProjectManager",
        components: {ProjectDialog},
        data() {
            return {
                projects: [],
                closedProjects: [],
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
                ProjectService.getAll().then(response => {
                    vm.projects = response.filter(item => item.closed === false)
                    vm.closedProjects = response.filter(item => item.closed === true);
                })
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
            deleteProject(project) {
                let vm = this;
                SweetAlert.confirmDelete("Delete project", "Confirm delete " + project.name + "!", function () {
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
    /deep/ .el-card__header {
        padding: 10px 15px;
        cursor: pointer;
    }
</style>
