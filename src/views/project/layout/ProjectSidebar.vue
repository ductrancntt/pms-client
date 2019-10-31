<template>
    <el-aside width="200px" class="fixed-sidebar">
        <el-menu>
            <el-menu-item index="1">Task</el-menu-item>
            <el-menu-item index="2">Member</el-menu-item>
            <el-menu-item index="3">Report</el-menu-item>
            <el-menu-item index="4">Resources</el-menu-item>
            <el-menu-item index="5">Schedule</el-menu-item>
            <el-menu-item index="6">Report</el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "ProjectSidebar",
        props: {
            project: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .fixed-sidebar {
        position: fixed;
        height: 100%;
        overflow-y: auto;
        background-color: white;
    }
</style>
