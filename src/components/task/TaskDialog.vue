<template>
    <div>
        <el-popover
                v-cloak
                placement="top"
                width="180"
                @show="trigger"
                @hide="hide"
                v-model="visible">
            <div>
                <el-form @keyup.enter.native="submit" onSubmit="return false;" ref="form" :rules="rules"
                         :model="taskForm">
                    <el-form-item prop="name" label="Name">
                        <el-input ref="txt" v-model="taskForm.name"></el-input>
                    </el-form-item>
                    <el-form-item class="margin-bottom-0">
                        <div class="row">
                            <div class="text-left flex">
                                <el-button size="medium" :disabled="isSaving" type="primary" @click="submit">Save
                                </el-button>
                            </div>
                            <div class="text-right flex">
                                <el-button size="medium" @click="hide">Cancel</el-button>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="primary" style="height: 100%; width: 100%" slot="reference">Add Task</el-button>
        </el-popover>
    </div>
</template>

<script>
    import AlertService from "@/service/alert.service";
    import TaskService from "@/service/task.service";

    export default {
        name: "TaskDialog",
        props: {
            categoryId: {
                type: Number,
                required: true,
            }
        },
        data() {
            return {
                isSaving: false,
                visible: false,
                taskForm: {
                    id: null,
                    name: null,
                    description: null,
                    pos: 0,
                    priority: 'NONE',
                    estimateStartDate: null,
                    estimateEndDate: null,
                    startDate: null,
                    endDate: null,
                    status: 'NO_PROGRESS',
                    overdue: false,
                    categoryId: null,
                    archived: false,
                },
                rules: {
                    name: [
                        {required: true, message: "This field is required", trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            trigger() {
                let vm = this;
                setTimeout(function () {
                    vm.$refs.txt.focus();
                }, 1)
            },
            hide() {
                let vm = this;
                vm.visible = false;
                vm.$refs.form.resetFields();
            },
            edit(entity) {
                this.categoryForm = Object.assign(this.categoryForm, entity);
                this.show();
            },
            submit() {
                let vm = this;
                vm.$refs.form.validate(async valid => {
                    if (valid) {
                        vm.isSaving = true;
                        vm.taskForm.categoryId = parseInt(this.categoryId);
                        if (vm.taskForm.id) {
                            TaskService.update(vm.taskForm).then(onSuccess).catch(onError);
                        } else {
                            TaskService.create(vm.taskForm).then(onSuccess).catch(onError);
                        }
                    }
                });


                function onSuccess(response) {
                    vm.taskForm = {
                        priority: 'NONE',
                        status: 'NO_PROGRESS',
                    };
                    AlertService.success("Task saved successfully!");
                    console.log(response);
                    vm.hide();
                    vm.isSaving = false;
                    vm.$emit("taskSaved");
                }

                function onError(error) {
                    AlertService.error("Task saved failed!");
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
