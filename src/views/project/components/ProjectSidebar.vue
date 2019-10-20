<template>
    <el-aside width="200px" class="fixed-sidebar">
        <el-menu :default-openeds="['1']">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>Project</template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">All Project</el-menu-item>
                    <el-menu-item index="1-2">Owned Project</el-menu-item>
                    <el-menu-item index="1-3">Joined Project</el-menu-item>
                    <el-menu-item index="1-4">Closed Project</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>Navigator Two</template>
                <el-menu-item-group>
                    <template slot="title">Group 1</template>
                    <el-menu-item index="2-1">Option 1</el-menu-item>
                    <el-menu-item index="2-2">Option 2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                    <el-menu-item index="2-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-4">
                    <template slot="title">Option 4</template>
                    <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>Navigator Three</template>
                <el-menu-item-group>
                    <template slot="title">Group 1</template>
                    <el-menu-item index="3-1">Option 1</el-menu-item>
                    <el-menu-item index="3-2">Option 2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                    <el-menu-item index="3-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="3-4">
                    <template slot="title">Option 4</template>
                    <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                </el-submenu>
            </el-submenu>
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
