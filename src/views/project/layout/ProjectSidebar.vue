<template>
    <el-aside :width="sideWidth" class="fixed-sidebar">
        <el-menu v-bind="menuProps" :collapse="collapse" :collapse-transition="false" :router="true">
            <el-menu-item style="border-bottom: 1px solid #bbb" @click="toggle">
                <i v-if="!collapse" class="el-icon-d-arrow-left"></i>
                <i v-else class="el-icon-d-arrow-right"></i>
                <span v-if="!collapse" slot="title">Collapse Menu</span>
                <span v-else slot="title">Show Menu</span>
            </el-menu-item>
            <el-menu-item v-for="item in sideMenu"
                          :key="item.routeName"
                          :index="item.routeName"
                          v-if="item.managerOnly ? isManager : true"
                          :route="{name: item.routeName}">
                <i :class="item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>

    export default {
        name: "ProjectSidebar",
        props: {
            isManager: {
                type: Boolean,
                required: true,
                default: false,
            },
            projectId: {
                type: Number,
                required: true,
            }
        },
        computed: {
            sideWidth() {
                return this.collapse ? '64px' : '200px';
            },
        },
        data() {
            return {
                menuProps: {
                    "default-active": "",
                },
                sideMenu: [
                    {
                        routeName: "projectTask",
                        icon: 'el-icon-circle-check',
                        label: "Task",
                        managerOnly: false,
                    },
                    {
                        routeName: "projectMember",
                        icon: 'el-icon-user-solid',
                        label: "Member",
                        managerOnly: false,
                    },
                    {
                        routeName: "projectResource",
                        icon: 'el-icon-paperclip',
                        label: "Resource",
                        managerOnly: false,
                    },
                    {
                        routeName: "projectArchived",
                        icon: 'el-icon-s-management',
                        label: "Archived",
                        managerOnly: false,
                    },
                    // {
                    //     routeName: "projectManager",
                    //     icon: 'el-icon-s-operation',
                    //     label: "Manager",
                    //     managerOnly: true,
                    // },
                    // {
                    //     routeName: "projectStatistic",
                    //     icon: 'el-icon-s-data',
                    //     label: "Statistic",
                    //     managerOnly: true,
                    // },
                    {
                        routeName: "projectSetting",
                        icon: 'el-icon-setting',
                        label: "Setting",
                        managerOnly: false,
                    },
                ],
                collapse: false,
            }
        },
        watch: {
            '$route'(to, from) {
                this.menuProps["default-active"] = to.name;
            }
        },
        created() {
            this.menuProps["default-active"] = this.$route.name;
        },
        methods: {
            toggle() {
                this.collapse = !this.collapse;
                this.$emit("toggleSidebar", this.collapse);
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

    /deep/ .is-active {
        background-color: #e6f0f6;
    }

    /deep/ .el-menu {
        border-right-width: 0;
    }
</style>
