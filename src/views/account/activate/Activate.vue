<template>
    <el-container style="align-items: center;">
        <el-row type="flex" style="flex: 1" justify="center">
            <el-col :span="7">
                <el-form :v-loading="isLoading"
                         :inline="false"
                         class="form-style text-center"
                         ref="successForm">

                    <el-form-item v-if="!isLoading && activateStatus">
                        <img style="width: 100px; height: 100px;" src="../../../assets/images/success.png"
                             alt="">
                        <h2 style="font-size: 4em !important;">Congratulation!</h2>
                        <br>
                        <p style="font-size: 1.5em !important;">Your account has been activated.</p>
                        <el-link href="/login">Click here to login</el-link>
                    </el-form-item>

                    <el-form-item v-if="!isLoading && !activateStatus">
                        <img style="width: 100px; height: 100px;" src="../../../assets/images/error.png"
                             alt="">
                        <h2 style="font-size: 4em !important;">Error</h2>
                        <br>
                        <p style="font-size: 1.5em !important;">Activation key not found.</p>
                        <el-link href="/">Go to homepage</el-link>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import AccountService from "@/views/account/account.service";

    export default {
        name: "Activate",
        data() {
            return {
                isLoading: true,
                activateStatus: false,
            }
        },
        created() {
            let vm = this;
            AccountService.activateAccount(this.$route.query.key).then(function () {
                console.log("active")
                vm.activateStatus = true;
                vm.isLoading = false;
                console.log(vm.activateStatus);
            }).catch(function () {
                console.log("inactive")
                vm.activateStatus = false;
                vm.isLoading = false;
            })
        }
    }
</script>

<style scoped>

</style>
