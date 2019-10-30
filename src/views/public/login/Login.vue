<template>
    <el-container v-loading.fullscreen.lock="isLogging" class="v-center">
        <el-row class="row flex-1 h-center">
            <el-col :span="6">
                <el-card shadow="never">
                    <el-form
                            @keyup.enter.native="login"
                            :inline="false"
                            :rules="rules"
                            :model="formData"
                            ref="loginForm">
                        <el-form-item :label="$t('login.usernameInput')" prop="username">
                            <el-input v-model="formData.username" placeholder="Username or email"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('login.passwordInput')" prop="password">
                            <el-input type="password" v-model="formData.password" placeholder="Password"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-link href="/reset-init" target="_blank" type="primary">
                                Forgot your password?
                            </el-link>
                        </el-form-item>

                        <el-form-item>
                            <el-button class="width-100" type="primary" @click="login">
                                {{ $t('login.btnLogin') }}
                            </el-button>
                        </el-form-item>

                        <el-form-item>
                            <el-button class="width-100" type="success" @click="register">
                                {{ $t('login.btnRegister') }}
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
    import AlertService from "@/service/alert.service";
    import AuthService from "@/service/auth.service";

    export default {
        name: "Login",
        data() {
            return {
                formData: {
                    username: "",
                    password: "",
                },
                isLogging: false,
                rules: {
                    username: [
                        { required: true, message: "Please enter username", trigger: "blur" }
                    ],
                    password: [
                        { required: true, message: "Please enter password", trigger: "blur" }
                    ]
                }
            }
        },
        methods: {
            login() {
                let vm = this;
                this.$refs["loginForm"].validate(async valid => {
                    if (valid) {
                        vm.isLogging = true;
                        AccountService.authenticate(this.formData)
                            .then(response => {
                                AuthService.setToken(response.accessToken);
                                AccountService.getCurrentAccount()
                                    .then(account => {
                                        AuthService.setCurrentUser(account);
                                        AuthService.setUserAuthorities(account.authorities);
                                        vm.isLogging = false;
                                        this.$router.push({path: "/"});
                                    })
                                    .catch(error => {
                                        vm.isLogging = false;
                                        AlertService.error(error.message);
                                        AuthService.logout();
                                    });

                            })
                            .catch(error => {
                                vm.isLogging = false;
                                AlertService.error(error.message);
                                AuthService.logout();
                            });
                    }
                });
            },
            register() {
                this.$router.push({path: "/register"});
            }
        }
    }
</script>

<style scoped>

</style>
