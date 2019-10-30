<template>
    <el-container class="v-center">

        <el-row class="row flex-1 h-center">
            <el-col :span="7">
                <el-card shadow="never">
                    <el-form
                            :inline="false"
                            :rules="rules"
                            :model="form"
                            ref="loginForm">
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="form.email" placeholder="Enter your email"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button :disabled="!isEmailValid || isSaving" style="width: 100%" type="primary" @click="reset">Reset Password
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import AccountService from "@/service/account.service";
    import SweetAlert from "@/service/sweet-alert.service";

    export default {
        name: "Reset",
        data() {
            return {
                form: {
                    email: ''
                },
                isSaving: false,
                rules: {
                    email: [
                        {required: true, message: "Please enter email", trigger: "blur"}
                    ]
                }
            }
        },
        computed:{
            isEmailValid(){
                return /[^@]+@[^\.]+\..+/.test(this.form.email);
            }
        },
        methods: {
            reset(){
                let vm = this;
                vm.isSaving = true;
                AccountService.resetPasswordRequest(this.form.email).then(response => {
                    SweetAlert.success("Success", "Check your email for password reset", "Go to login").then(function (result) {
                        vm.$router.push({name: 'loginPage'})
                    });
                    vm.isSaving = false;
                }).catch(err => {
                    vm.isSaving = false;
                    SweetAlert.error("Error", "Sorry! Something went wrong", "OK");
                })
            }
        }
    }
</script>

<style scoped>

</style>
