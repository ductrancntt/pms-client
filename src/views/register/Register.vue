<template>
    <el-row type="flex" justify="center" align="center">
        <el-col :span="6">
            <el-form
                    :inline="false"
                    :model="formData"
                    ref="registerForm">

                <el-form-item :label="$t('register.username')" prop="username">
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>

                <el-form-item :label="$t('register.password')" prop="password">
                    <el-input type="password" v-model="formData.password"></el-input>
                </el-form-item>

                <el-form-item :label="$t('register.firstName')" prop="firstName">
                    <el-input v-model="formData.firstName"></el-input>
                </el-form-item>

                <el-form-item :label="$t('register.lastName')" prop="lastName">
                    <el-input v-model="formData.lastName"></el-input>
                </el-form-item>

                <el-form-item :label="$t('register.email')" prop="email">
                    <el-input v-model="formData.email"></el-input>
                </el-form-item>

                <el-form-item :label="$t('register.langKey')" prop="langKey">
                    <el-select v-model="formData.langKey" value-key="formData.langKey">
                        <el-option
                                v-for="item in languages"
                                :key="item.id"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="register">{{ $t('register.btnConfirm') }}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">{{ $t('register.btnLogin') }}</el-button>
                </el-form-item>

            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import path from "@/router/path";
    import AccountService from "@/api/account"

    export default {
        name: "Register",
        data() {
            return {
                languages: [
                    {
                        id: 1,
                        label: "English",
                        value: "en",
                    },
                    {
                        id: 2,
                        label: "Tiếng Việt",
                        value: "vi",
                    },
                ],
                formData: {
                    firstName: null,
                    lastName: null,
                    email: null,
                    username: null,
                    password: null,
                    confirm: null,
                    langKey: "en",
                }
            }
        },
        methods: {
            register() {
                AccountService.register(this.formData).then(response => {
                    this.$notify({
                        title: 'Success',
                        message: response.data.message,
                        type: 'success'
                    });
                }).catch(error => {
                    console.log(error.response);
                    this.$notify({
                        title: 'Error',
                        message: error.response.data.message ? error.response.data.message : "Error",
                        type: 'error'
                    });
                })

            },
            login() {
                this.$router.push({path: path.loginUrl})
            }
        }
    }
</script>

<style scoped>

</style>