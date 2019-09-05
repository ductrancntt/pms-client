<template>
    <el-row type="flex" justify="center" align="center">
        <el-col :span="6">
            <el-form
                    :inline="false"
                    class="demo-form-inline"
                    :rules="rules"
                    :model="formData"
                    ref="loginForm">

                <el-form-item :label="$t('login.usernameInput')" prop="username">
                    <el-input v-model="formData.usernameOrEmail" placeholder="Username"></el-input>
                </el-form-item>

                <el-form-item :label="$t('login.passwordInput')" prop="password">
                    <el-input type="password" v-model="formData.password" placeholder="Password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="login">{{ $t('login.btnLogin') }}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="register">{{ $t('login.btnRegister') }}</el-button>
                </el-form-item>

            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import Auth from '@/security/authentication';
    import Validation from '@/views/login/form-validation';
    import AlertService from "@/service/alert";

    export default {
        name: "Login",
        mixins: [Validation],
        data() {
            return {
                formData: {
                    usernameOrEmail: "",
                    password: "",
                },
            }
        },
        methods: {
            login() {
                this.$refs["loginForm"].validate(async valid => {
                    if (valid) {
                        try {
                            const status = await Auth.login(this.formData);
                            if (status) {
                                await this.$router.push({path: "/"});
                            } else {
                                AlertService.error("Error", "Can't login!");
                            }
                        } catch (ex) {
                            if (ex.response){
                                if (ex.response.status == 401){
                                    AlertService.error("Error", "Wrong username or password!");
                                } else {
                                    AlertService.error(ex.name, ex.message);
                                }
                            } else {
                                AlertService.error(ex.name, ex.message);
                            }
                        }
                    }
                });
            },
            register(){
                this.$router.push({path: "/register"});
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>