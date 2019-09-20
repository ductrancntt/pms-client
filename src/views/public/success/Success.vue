<template>
    <el-container style="align-items: center;">
        <el-row type="flex" style="flex: 1" justify="center">
            <el-col :span="7">
                <el-form
                        :inline="false"
                        class="form-style text-center"
                        ref="successForm">

                    <el-form-item>
                        <img style="width: 100px; height: 100px;" src="../../../assets/images/success.png"
                             alt="">
                        <h2 style="font-size: 1.5em !important;">Register success! <br> Check email for account
                            activation</h2>
                        <el-link href="/login">Click here to login</el-link>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    export default {
        name: "Success"
    }
</script>

<style scoped>

</style>