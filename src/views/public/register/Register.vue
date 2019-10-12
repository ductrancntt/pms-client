<template>
    <el-container style="align-items: center;">

        <el-row type="flex" style="flex: 1" justify="center">
            <el-col :span="7">
                <el-form
                        :inline="false"
                        class="form-style"
                        :rules="rules"
                        :model="formData"
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
                        <el-button class="btn-block" type="success" @click="register">{{ $t('register.btnConfirm') }}
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn-block" type="primary" @click="login">{{ $t('register.btnLogin') }}
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
    import router from "vue-router";

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
                        {required: true, message: "Please enter email", trigger: "blur"}
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
        methods: {
            register() {
                let vm = this;
                vm.$refs["registerForm"].validate(async valid => {
                    if (valid) {
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
    .form-style {
        background-color: whitesmoke;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
    }
</style>