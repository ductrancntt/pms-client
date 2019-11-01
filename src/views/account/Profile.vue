<template>
    <div class="row flex padding-20">
        <div class="flex"></div>
        <div class="column flex-2">
            <el-card class="flex" shadow="never">
                <div class="row flex">
                    <div class="flex">
                        <div class="text-center">
                            <div class="text-center">
                                <SingleImageUploader :imageUrl="user.imageUrl ? user.imageUrl : ''" ref="avatar"/>
                            </div>
                        </div>
                        <div class="text-center padding-top-15">
                            <el-button @click="clearImage" size="small">
                                Reset
                            </el-button>
                        </div>
                    </div>
                    <div class="flex">
                        <el-form @submit.native="submit" ref="form" :model="user" :rules="rules">
                            <el-form-item label="First Name" prop="firstName">
                                <el-input v-model="user.firstName"></el-input>
                            </el-form-item>
                            <el-form-item label="Last Name" prop="lastName">
                                <el-input v-model="user.lastName"></el-input>
                            </el-form-item>
                            <el-form-item label="Email" prop="email">
                                <el-input v-model="user.email"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button :disabled="isSaving" @click="submit" type="primary">Save</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="flex">&nbsp;</div>
    </div>
</template>

<script>
    import AccountService from "@/service/account.service";
    import SingleImageUploader from "@/components/SingleImageUploader";
    import AuthService from "@/service/auth.service";
    import {bus} from "@/main";
    import AlertService from "@/service/alert.service";

    export default {
        name: "Profile",
        components: {SingleImageUploader},
        data() {
            return {
                isSaving: false,
                user: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    imageUrl: '',
                },
                rules: {
                    firstName: [{
                        required: true,
                        message: "This field is required",
                        trigger: 'blur'
                    }],
                    lastName: [{
                        required: true,
                        message: "This field is required",
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        message: "This field is required",
                        trigger: 'blur'
                    }],
                },
                selectedImage: null,
            }
        },
        created() {
            AccountService.getCurrentAccount().then(response => {
                console.log(response);
                this.user = response;
                console.log(this.user);
            })
        },
        methods: {
            clearImage() {
                let vm = this;
                vm.$refs.avatar.clearThumbnail();
                vm.$refs.avatar.reset();
            },
            submit() {
                let vm = this;
                vm.$refs.form.validate(async valid => {
                    vm.selectedImage = vm.$refs.avatar.getSelectedFile();
                    if (valid) {
                        vm.isSaving = true;
                        let params = new FormData();
                        params.append('dto', new Blob([JSON.stringify(vm.user)], {type: 'application/json'}));
                        if (vm.selectedImage) {
                            params.append('image', vm.selectedImage.raw);
                        } else {
                            params.append('image', null);
                        }

                        AccountService.updateCurrentAccount(params).then(response => {
                            AccountService.getCurrentAccount().then(account => {
                                AuthService.setCurrentUser(account);
                                bus.$emit("updateAccount");
                                AlertService.success("Update account successfully!");
                            }).catch(err => {
                                AlertService.error("Update account failed!");
                            }).finally(() => {
                                vm.isSaving = false;
                            });
                        });

                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
