<template>
    <div id="kanban" style="overflow-y: hidden" v-loading="isLoading">
        <table class="table" v-if="project.info != null">
            <thead>
            <th class="title-cell">
                <i class="el-icon-circle-check"></i>
                NO PROGRESS
            </th>
            <th class="title-cell">
                <i class="el-icon-circle-check text-warning"></i>
                IN PROGRESS
            </th>
            <th class="title-cell">
                <i class="el-icon-circle-check text-success"></i>
                COMPLETED
            </th>
            <th v-if="project.info.verifyTask" class="title-cell">
                <i class="el-icon-success text-success"></i>
                VERIFIED
            </th>
            </thead>
            <tbody>
            <tr :key="category.info.id" class="table-row" v-for="category in project.categories">
                <!--NO_PROGRESS-->
                <td class="table-cell">
                    <div class="category-title">
                        <transition name="el-fade-in-linear">
                            <el-tag @click="toggleCategory(category)" style="cursor: pointer" v-if="category.show">
                                <i class="el-icon-arrow-down"></i>
                            </el-tag>
                            <el-tag @click="toggleCategory(category)" style="cursor: pointer" v-else>
                                <i class="el-icon-arrow-right"></i>
                            </el-tag>
                        </transition>
                        <div class="padding-left-10 flex">
                            <el-tag class="width-100">{{category.info.name}}</el-tag>
                        </div>
                        <div class="padding-left-10" v-if="isManager">
                            <el-dropdown trigger="click">
                                <el-tag class="el-dropdown-link" style="cursor: pointer">
                                    <i class="el-icon-more"></i>
                                </el-tag>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="unarchiveCategory(category.info.id)"><i
                                            class="el-icon-collection-tag"></i>Unarchive
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="deleteCategory(category.info.id)"><i
                                            class="el-icon-delete"></i>Delete
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>

                    <el-collapse-transition>
                        <div class="list-group" v-show="category.show">
                            <draggable :disabled="true"
                                       :list="category.noProgress"
                                       class="list-group"
                                       v-bind="dragOptions">
                                <TaskItem :is-archived="true"
                                          :is-manager="isManager"
                                          :key="task.id"
                                          :project-id="projectId"
                                          :task="task"
                                          class="list-group-item"
                                          v-for="task in category.noProgress"/>
                            </draggable>
                        </div>
                    </el-collapse-transition>

                </td>

                <!--IN_PROGRESS-->
                <td class="table-cell">
                    <div class="category-title">
                        <span>&nbsp;</span>
                    </div>
                    <el-collapse-transition>
                        <div class="list-group" v-show="category.show">
                            <draggable :disabled="true"
                                       :list="category.inProgress"
                                       class="list-group"
                                       v-bind="dragOptions">
                                <TaskItem :is-archived="true"
                                          :is-manager="isManager"
                                          :key="task.id"
                                          :project-id="projectId"
                                          :task="task"
                                          class="list-group-item"
                                          v-for="task in category.inProgress"/>
                            </draggable>
                        </div>
                    </el-collapse-transition>
                </td>

                <!--COMPLETED-->
                <td class="table-cell">
                    <div class="category-title">
                        <span>&nbsp;</span>
                    </div>
                    <el-collapse-transition>
                        <div class="list-group" v-show="category.show">
                            <draggable :disabled="true"
                                       :list="category.completed"
                                       class="list-group"
                                       v-bind="dragOptions">
                                <TaskItem :is-archived="true"
                                          :is-manager="isManager"
                                          :key="task.id"
                                          :project-id="projectId"
                                          :task="task"
                                          class="list-group-item"
                                          v-for="task in category.completed"/>
                            </draggable>
                        </div>
                    </el-collapse-transition>
                </td>

                <!--VERIFIED-->
                <td v-if="project.info.verifyTask" :class="isManager?'':'bg-info disable-cursor'" class="table-cell">
                    <div class="category-title">
                        <el-tag class="width-100 text-center" type="danger" v-if="!isManager">Manager Only
                        </el-tag>
                        <span v-else>&nbsp;</span>
                    </div>
                    <el-collapse-transition>
                        <div class="list-group" v-show="category.show">
                            <draggable :disabled="true"
                                       :list="category.verified"
                                       class="list-group"
                                       v-bind="dragOptions">
                                <TaskItem :is-archived="true"
                                          :is-manager="isManager"
                                          :key="task.id"
                                          :project-id="projectId"
                                          :task="task"
                                          class="list-group-item"
                                          v-for="task in category.verified"/>
                            </draggable>
                        </div>
                    </el-collapse-transition>
                </td>
            </tr>
            <tr>
                <td class="text-center" :colspan="project.info.verifyTask ? 4 : 3">
                    <el-divider></el-divider>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import TaskItem from "@/components/task/TaskItem";
    import draggable from "vuedraggable";
    import CategoryDialog from "@/components/category/CategoryDialog";
    import ProjectService from "@/service/project.service";
    import AlertService from "@/service/alert.service";
    import TaskDialog from "@/components/task/TaskDialog";
    import CategoryService from "@/service/category.service";

    export default {
        name: "ProjectArchived",
        components: {TaskDialog, CategoryDialog, TaskItem, draggable},
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
            dragOptions() {
                return {
                    animation: 300,
                    group: "task",
                    ghostClass: "ghost",
                };
            }
        },
        data() {
            return {
                isLoading: true,
                project: {},
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            deleteCategory(id) {
                let vm = this;
                AlertService.confirm("Confirm delete category?", function () {
                    CategoryService.delete(id)
                        .then(() => {
                            AlertService.success("Delete category successfully!");
                            vm.loadData();
                        })
                        .catch(() => {
                            AlertService.error("Delete category failed");
                            vm.loadData();
                        });
                });
            },
            unarchiveCategory(id) {
                let vm = this;
                AlertService.confirm("Confirm unarchive category?", function () {
                    CategoryService.unarchive(id)
                        .then(() => {
                            AlertService.success("Category unarchived successfully!");
                            vm.loadData();
                        })
                        .catch(() => {
                            AlertService.error("Category unarchived failed");
                            vm.loadData();
                        });
                });
            },
            toggleCategory(category) {
                category.show = !category.show;
                this.$set(category, 'show', category.show);
            },
            loadData() {
                let vm = this;
                vm.isLoading = false;
                ProjectService.getTaskArchived({
                    projectId: vm.projectId
                }).then(response => {
                    vm.isLoading = false;
                    vm.project = response;
                }).catch(err => {
                    AlertService.error(err.message);
                });
            },
        }
    }
</script>

<style scoped>
    .list-group {
        height: 100%;
    }

    .list-group-item {

    }

    .ghost {
        font-size: 0;
        opacity: 1;
        background-color: transparent;
        border: 2px dashed #026AA7;
        border-radius: 5px;
    }

    .border-dashed {
        border: 1px dashed #aebacc;
    }

    #kanban .table .table-cell:first-of-type {
        border-left-width: 0;
    }

    .table-cell {
        height: 1px;
        padding: 10px 5px;
        border: none;
        border-left: 1px dashed #aebacc;
    }

    table th {
        vertical-align: middle;
    }

    .table-row {
        border-top: 1px solid #aaa;
    }

    #kanban .table {
        vertical-align: top;
        width: 100%;
        table-layout: fixed;
        word-wrap: break-word;
    }

    .title-cell {
        position: relative;
        border: none;
        border-left: 1px solid #d6dce6;
        background-color: #fff;
        height: 3rem;
        font-size: 16pt;
        color: #3a4352;
        text-align: center;
        font-weight: 700;
    }

    .category-title {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        padding: 0 5px 5px 5px;
        height: 30px;
    }

    /deep/ .el-divider__text {
        background-color: transparent;

    }

    /deep/ .el-divider {
        background-color: #aaa;
    }

    .disable-cursor {
        cursor: not-allowed;
    }
</style>
