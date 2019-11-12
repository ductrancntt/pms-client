<template>
    <el-container class="v-center">
        <el-row class="row flex-1 h-center">
            <el-col :span="7">
                <el-card shadow="never">

                    <el-form
                            :inline="false"
                            :model="formData"
                            :rules="rules"
                            @keyup.enter.native="register"
                            ref="registerForm">

                        <el-form-item>
                            <el-col :span="11">
                                <el-form-item :label="$t('register.firstName')" prop="firstName">
                                    <el-input v-model="formData.firstName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="11">
                                <el-form-item :label="$t('register.lastName')" prop="lastName">
                                    <el-input v-model="formData.lastName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>

                        <el-form-item :label="$t('register.username')" prop="username">
                            <el-input v-model="formData.username"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('register.password')" prop="password">
                            <el-input type="password" v-model="formData.password"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('register.email')" prop="email">
                            <el-input v-model="formData.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="register" class="width-100" type="success">
                                {{ $t('register.btnConfirm') }}
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="login" class="width-100" type="primary">
                                {{ $t('register.btnLogin') }}
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
        name: "Register",
        data() {
            return {
                rules: {
                    username: [
                        {required: true, message: "Please enter username", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "Please enter password", trigger: "blur"}
                    ],
                    firstName: [
                        {required: true, message: "Please enter first name", trigger: "blur"}
                    ],
                    lastName: [
                        {required: true, message: "Please enter last name", trigger: "blur"}
                    ],
                    email: [
                        {required: true, message: "Please enter email", trigger: "blur", regex: '[^@]+@[^\\.]+\\..+'}
                    ]
                },
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
        computed: {
            isEmailValid() {
                return /[^@]+@[^\.]+\..+/.test(this.formData.email);
            }
        },
        methods: {
            register() {
                let vm = this;
                vm.$refs["registerForm"].validate(async valid => {
                    if (valid && vm.isEmailValid) {
                        AccountService.register(this.formData).then(response => {
                            SweetAlert.success("Success", "Account has been created, check email for activation!", "Go to login")
                                .then(function (result) {
                                    vm.$router.push({name: 'loginPage'})
                                })
                        }).catch(error => {
                            this.$notify({
                                title: 'Error',
                                message: error.message,
                                type: 'error'
                            });
                        })
                    }
                });
            },
            login() {
                this.$router.push({name: 'loginPage'})
            }
        }
    }
</script>

<style scoped>
</style>
