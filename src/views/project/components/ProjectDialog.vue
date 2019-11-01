<template>
    <div>
        <el-dialog title="Project Dialog" width="30%" :visible.sync="dialogVisible">
            <el-form ref="projectForm" :model="projectForm">
                <el-form-item prop="name" label="Name">
                    <el-input v-model="projectForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="description" label="Description">
                    <el-input type="textarea" :rows="5" v-model="projectForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="isSaving" type="primary" @click="submit">Save</el-button>
                    <el-button @click="hide">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import ProjectService from "@/service/project.service";
    import AlertService from "@/service/alert.service";

    export default {
        name: "ProjectDialog",
        data() {
            return {
                isSaving: false,
                dialogVisible: false,
                projectForm: {
                    id: null,
                    name: null,
                    description: null,
                    closed: null
                }
            }
        },
        methods: {
            show() {
                this.dialogVisible = true;
            },
            hide() {
                this.dialogVisible = false;
            },
            edit(project) {
                this.projectForm = Object.assign(this.projectForm, project);
                this.show();
            },
            submit() {
                let vm = this;
                vm.isSaving = true;
                if (vm.projectForm.id) {
                    ProjectService.update(vm.projectForm).then(onSuccess).catch(onError);
                } else {
                    ProjectService.create(vm.projectForm).then(onSuccess).catch(onError);
                }

                function onSuccess(response) {
                    AlertService.success("Project saved successfully!");
                    console.log(response);
                    vm.hide();
                    vm.isSaving = false;
                    vm.$emit("projectSaved");
                }

                function onError(error) {
                    AlertService.error("Project saved failed!");
                    console.log(error);
                    vm.hide();
                    vm.isSaving = false;
                }
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-dialog__header {
        background: #026aa7;
    }

    /deep/ .el-dialog__title {
        color: white !important;
    }
</style>
