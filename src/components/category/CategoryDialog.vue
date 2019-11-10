<template>
    <el-popover
            v-cloak
            placement="top"
            width="180"
            @show="trigger"
            @hide="hide"
            v-model="visible">
        <div>
            <el-form @keyup.enter.native="submit" ref="form" :rules="rules" :model="categoryForm">
                <el-form-item prop="name" label="Name">
                    <el-input ref="txt" v-model="categoryForm.name"></el-input>
                </el-form-item>
                <el-form-item style="display: none">
                    <el-input></el-input>
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
        <el-button type="primary" style="height: 100%" slot="reference">Quick Add Category</el-button>
    </el-popover>
</template>

<script>
    import AlertService from "@/service/alert.service";
    import CategoryService from "@/service/category.service";

    export default {
        name: "CategoryDialog",
        props: {
            projectId: {
                type: Number,
                required: true,
            }
        },
        data() {
            return {
                isSaving: false,
                visible: false,
                categoryForm: {
                    id: null,
                    name: null,
                    projectId: null,
                    archived: false,
                    pos: 0
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
            },
            submit() {
                let vm = this;
                vm.$refs.form.validate(async valid => {
                    if (valid) {
                        vm.isSaving = true;
                        vm.categoryForm.projectId = parseInt(this.projectId);
                        if (vm.categoryForm.id) {
                            CategoryService.updateName(vm.categoryForm).then(onSuccess).catch(onError);
                        } else {
                            CategoryService.create(vm.categoryForm).then(onSuccess).catch(onError);
                        }
                    }
                });

                function onSuccess(response) {
                    vm.categoryForm = {};
                    AlertService.success("Category saved successfully!");
                    console.log(response);
                    vm.hide();
                    vm.isSaving = false;
                    vm.$emit("categorySaved");
                    vm.hide();
                }

                function onError(error) {
                    AlertService.error("Category saved failed!");
                    console.log(error);
                    vm.hide();
                    vm.isSaving = false;
                    vm.hide();
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
