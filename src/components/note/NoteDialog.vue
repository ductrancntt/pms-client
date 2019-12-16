<template>
    <div>
        <el-dialog :close-on-click-modal="false" :destroy-on-close="true" :visible.sync="dialogVisible"
                   title="Note Dialog" width="30%">
            <el-form :model="noteForm" ref="noteForm">
                <el-form-item label="Content" prop="content">
                    <el-input :rows="5" autofocus ref="txtName" type="textarea" v-model="noteForm.content"/>
                </el-form-item>
                <el-form-item>
                    <ColorPicker :init-color="noteForm.color" ref="colorPicker"/>
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="isSaving || !noteForm.content" @click="submit" type="primary">Save</el-button>
                    <el-button @click="hide">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import AlertService from "@/service/alert.service";
    import ColorPicker from "@/components/ColorPicker";
    import NoteService from "@/service/note.service";

    export default {
        name: "NoteDialog",
        components: {ColorPicker},
        data() {
            return {
                isSaving: false,
                dialogVisible: false,
                noteForm: {
                    id: null,
                    content: null,
                    pos: null,
                    color: null
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
                // this.noteForm = {};
                // this.$refs.noteForm.resetFields();
            },
            edit(note) {
                console.log("edit");
                this.noteForm = JSON.parse(JSON.stringify(note));
                let vm = this;
                setTimeout(function () {
                    vm.$refs.colorPicker.setColor(vm.noteForm.color);
                }, 100)

                this.show();
            },
            submit() {
                let vm = this;
                vm.isSaving = true;
                vm.noteForm.color = vm.$refs.colorPicker.getSelectedColor();
                if (vm.noteForm.id) {
                    NoteService.update(vm.noteForm).then(onSuccess).catch(onError);
                } else {
                    NoteService.create(vm.noteForm).then(onSuccess).catch(onError);
                }

                function onSuccess(response) {
                    AlertService.success("Note saved successfully!");
                    console.log(response);
                    vm.hide();
                    vm.isSaving = false;
                    vm.noteForm = {};
                    vm.$emit("noteSaved");
                }

                function onError(error) {
                    AlertService.error("Note saved failed!");
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