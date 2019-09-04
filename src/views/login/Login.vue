<template>
    <el-row type="flex" justify="center">
        <el-col :span="6">
            <el-form
                    :inline="false"
                    class="demo-form-inline"
                    :rules="rules"
                    :model="formData"
                    ref="loginForm">

                <el-form-item :label="$t('login.usernameInput')" prop="username">
                    <el-input v-model="formData.username" placeholder="Username"></el-input>
                </el-form-item>

                <el-form-item :label="$t('login.passwordInput')" prop="password">
                    <el-input type="password" v-model="formData.password" placeholder="Password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="login">{{ $t('login.buttonLogin') }}</el-button>
                </el-form-item>

            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import auth from '@/security/authentication';
    import validation from '@/views/login/form-validation';

    export default {
        name: "Login",
        mixins: [validation],
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
                        try {
                            const status = await auth.authenticate(this.formData.username, this.formData.password);
                            if (status) {
                                await this.$router.push({path: "/"});
                            } else {
                                // alert failure message
                            }
                        } catch (ex) {
                            console.log(ex);
                            // alert failure message
                        }
                    }
                });

            }
        }
    }
</script>

<style lang="scss" scoped>
</style>