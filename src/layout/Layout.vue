<template>
    <el-container direction="horizontal">
        <el-container direction="vertical">
            <Header></Header>
            <el-main class="row padding-0">
                <router-view>
                    <!--Content goes here-->
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Sidebar from "@/layout/modules/Sidebar";
    import Header from "@/layout/modules/Header";
    export default {
        name: "Layout",
        components: {Header, Sidebar}
    }
</script>

<style scoped>

</style>
