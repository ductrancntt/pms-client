<template>
    <el-container direction="horizontal">
        <el-container direction="vertical">
            <Header></Header>
            <el-main class="row padding-0">
                <transition name="fade" mode="out-in">
                    <router-view>
                        <!--Content goes here-->
                    </router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from "@/layout/modules/Header";

    export default {
        name: "Layout",
        components: {Header}
    }
</script>

<style scoped>

</style>
