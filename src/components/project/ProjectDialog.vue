<template>
    <div>
        <el-dialog :destroy-on-close="true" :close-on-click-modal="false" :visible.sync="dialogVisible" title="Project Dialog" width="30%">
            <el-form :model="projectForm" ref="projectForm">
                <el-form-item label="Name" prop="name">
                    <el-input autofocus ref="txtName" v-model="projectForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Description" prop="description">
                    <el-input :rows="5" type="textarea" v-model="projectForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="isSaving || !projectForm.name" @click="submit" type="primary">Save</el-button>
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
                let vm = this;
                vm.dialogVisible = true;
                setTimeout(function () {
                    vm.$refs.txtName.focus();
                }, 1)
            },
            hide() {
                this.dialogVisible = false;
                this.projectForm = {};
                this.$refs.projectForm.resetFields();
            },
            edit(project) {
                console.log("edit");
                this.projectForm = JSON.parse(JSON.stringify(project));
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
                    vm.projectForm = {};
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
