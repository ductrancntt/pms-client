<template>
    <el-container id="main-container" direction="horizontal">
        <Sidebar></Sidebar>
        <el-container direction="vertical">
            <Header></Header>
            <el-main>
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
    #main-container{
        height: 100%;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }

    .el-footer {
        background-color: #B3C0D1;
        color: #333;
    }
</style>