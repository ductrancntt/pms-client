<template>
    <el-container style="align-items: center;">
        <el-row type="flex" style="flex: 1" justify="center">
            <el-col :span="7">
                <el-form
                        :inline="false"
                        class="form-style"
                        :rules="rules"
                        :model="form"
                        ref="loginForm">
                    <el-form-item label="New password" prop="newPassword">
                        <el-input type="password" v-model="form.newPassword" placeholder="New password"></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm new password" prop="confirm">
                        <el-input type="password" v-model="confirm" placeholder="Confirm"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :disabled="isSaving || !isFormValid" style="width: 100%" type="success"
                                   @click="reset">Reset Password
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>

    import AccountService from "@/views/account/account.service";
    import SweetAlert from "@/service/sweet-alert.service";

    export default {
        name: "ResetFinish",
        data() {
            return {
                form: {
                    key: null,
                    newPassword: null
                },
                confirm: null,
                isSaving: false,
            }
        },
        methods: {
            reset() {
                let vm = this;
                vm.isSaving = true;
                console.log(vm.form);
                AccountService.resetPasswordFinish(vm.form).then(function () {
                    console.log("success");
                    vm.isSaving = false;
                    SweetAlert.success("Success", "Your password has been updated", "Go to login").then(function (result) {
                        vm.$router.push({name: 'loginPage'})
                    })
                }).catch(function () {
                    console.log("failed");
                    vm.isSaving = false;
                    SweetAlert.error("Error", "Sorry! Your password wasn't reset", "OK");
                })
            },
        },
        computed: {
            isFormValid: function () {
                return this.form.newPassword == this.confirm && this.form.newPassword != '' && this.confirm != '';
            }
        },
        created() {
            this.form.key = this.$route.query.key;
        }
    }
</script>

<style scoped>

</style>