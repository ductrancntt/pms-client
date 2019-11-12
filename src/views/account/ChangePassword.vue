<template>
    <div class="row v-center h-center flex">
        <el-card shadow="never">
            <el-form :inline="false" :model="form" :rules="rules" ref="changePasswordForm">
                <el-form-item prop="oldPassword">
                    <InputLabel label="Old password"/>
                    <el-input type="password" v-model="form.oldPassword"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <InputLabel label="New password"/>
                    <el-input type="password" v-model="form.newPassword"></el-input>
                </el-form-item>
                <el-form-item prop="confirm">
                    <InputLabel label="Confirm new password"/>
                    <el-input type="password" v-model="form.confirm"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="isSaving" @click="submit" class="width-100" type="primary">Change password
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import AlertService from "@/service/alert.service";
    import AccountService from "@/service/account.service";

    export default {
        name: "ChangePassword",
        data() {
            return {
                isSaving: false,
                form: {
                    oldPassword: null,
                    newPassword: null,
                    confirm: null,
                },
                rules: {
                    oldPassword: [
                        {required: true, message: "Please enter old password", trigger: "blur"}
                    ],
                    newPassword: [
                        {required: true, message: "Please enter new password", trigger: "blur"}
                    ],
                    confirm: [
                        {required: true, message: "Please enter confirm new password", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            submit() {
                let vm = this;
                this.$refs["changePasswordForm"].validate(async valid => {
                    if (valid) {
                        if (vm.form.newPassword !== vm.form.confirm) AlertService.error("Confirm password does not match");
                        else {
                            vm.isSaving = true;
                            AccountService.changePassword(vm.form).then(response => {
                                AlertService.success("Change password successfully");
                                vm.$router.push({name: 'home'});
                                vm.isSaving = false;
                            }).catch(error => {
                                vm.isSaving = false;
                                AlertService.error(error.message);
                            })
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
