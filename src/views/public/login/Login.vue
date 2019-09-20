<template>
    <el-container style="align-items: center;">

        <el-row type="flex" style="flex: 1" justify="center">
            <el-col :span="7">
                <el-form
                        :inline="false"
                        class="form-style"
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
                        <el-link href="/forgot-password" target="_blank" type="primary">Forgot your password?
                        </el-link>
                    </el-form-item>

                    <el-form-item>
                        <el-button style="width: 100%" type="primary" @click="login">{{ $t('login.btnLogin') }}
                        </el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button style="width: 100%" type="success" @click="register">{{ $t('login.btnRegister') }}
                        </el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import Validation from '@/views/public/login/form-validation';
    import AccountService from "@/views/account/account.service";
    import AlertService from "@/service/alert.service";
    import AuthService from "@/security/auth.service";

    export default {
        name: "Login",
        mixins: [Validation],
        data() {
            return {
                formData: {
                    username: "",
                    password: "",
                },
            }
        },
        methods: {
            login() {
                this.$refs["loginForm"].validate(async valid => {
                    if (valid) {
                        AccountService.authenticate(this.formData)
                            .then(response => {
                                console.log(response);
                                AuthService.setToken(response.accessToken);
                                AccountService.getCurrentAccount()
                                    .then(account => {
                                        AuthService.setCurrentUser(account);
                                        AuthService.setUserAuthorities(account.authorities);
                                        this.$router.push({path: "/"});
                                    })
                                    .catch(error => {
                                        AlertService.error("Login failed");
                                        AuthService.logout();
                                    });

                            })
                            .catch(error => {
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

    .form-style {
        background-color: whitesmoke;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
    }
</style>