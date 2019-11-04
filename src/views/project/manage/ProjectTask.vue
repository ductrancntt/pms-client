<template>
    <div id="kanban" v-loading="isLoading" style="overflow-y: hidden">
        <el-row type="flex" justify="space-between" class="padding-10">
            <div>
                <el-button type="text" @click="$router.push({name: 'home'})">
                    <el-icon name="arrow-left"></el-icon>
                    Back
                </el-button>
            </div>
            <div>
                <CategoryDialog v-if="isManager" :project-id="projectId" @categorySaved="loadData"/>
            </div>
        </el-row>
        <table class="table">
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
            <th class="title-cell">
                <i class="el-icon-success text-success"></i>
                VERIFIED
            </th>
            </thead>
            <tbody>
            <tr class="table-row" v-for="category in project.categories" :key="category.info.id">
                <!--NO_PROGRESS-->
                <td class="table-cell">
                    <div class="category-title">
                        <transition name="el-fade-in-linear">
                            <el-tag style="cursor: pointer" v-if="category.show" @click="toggleCategory(category)">
                                <i class="el-icon-arrow-down"></i>
                            </el-tag>
                            <el-tag style="cursor: pointer" v-else @click="toggleCategory(category)">
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
                                    <el-dropdown-item><i class="el-icon-edit"></i>Edit</el-dropdown-item>
                                    <el-dropdown-item @click.native="archiveCategory(category.info.id)"><i
                                            class="el-icon-collection-tag"></i>Archive
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="deleteCategory(category.info.id)"><i
                                            class="el-icon-delete"></i>Delete
                                    </el-dropdown-item>
                                    <el-dropdown-item><i class="el-icon-s-order"></i>Reorder</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>

                    <el-collapse-transition>
                        <div v-show="category.show" class="list-group">
                            <draggable class="list-group"
                                       :list="category.noProgress"
                                       v-bind="dragOptions"
                                       @change="log($event, category.noProgress, category.info.id, 'NO_PROGRESS')">
                                <TaskItem :is-manager="isManager"
                                          class="list-group-item"
                                          :project-id="projectId"
                                          v-for="task in category.noProgress"
                                          :key="task.id"
                                          @taskDeleted="loadData"
                                          @taskChange="taskChange($event, task)"
                                          :task="task"/>
                                <div class="padding-5" slot="footer" v-if="isManager">
                                    <TaskDialog is-popover @taskSaved="loadData" :category-id="category.info.id"/>
                                </div>
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
                        <div v-show="category.show" class="list-group">
                            <draggable class="list-group"
                                       :list="category.inProgress"
                                       v-bind="dragOptions"
                                       @change="log($event, category.inProgress, category.info.id, 'IN_PROGRESS')">
                                <TaskItem :is-manager="isManager"
                                          class="list-group-item"
                                          :project-id="projectId"
                                          v-for="task in category.inProgress"
                                          :key="task.id"
                                          @taskDeleted="loadData"
                                          @taskChange="taskChange($event, task)"
                                          :task="task"/>
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
                        <div v-show="category.show" class="list-group">
                            <draggable class="list-group"
                                       :list="category.completed"
                                       v-bind="dragOptions"
                                       @change="log($event, category.completed, category.info.id, 'COMPLETED')">
                                <TaskItem :is-manager="isManager"
                                          class="list-group-item"
                                          :project-id="projectId"
                                          v-for="task in category.completed"
                                          :key="task.id"
                                          @taskChange="taskChange($event, task)"
                                          @taskDeleted="loadData"
                                          :task="task"/>
                            </draggable>
                        </div>
                    </el-collapse-transition>
                </td>

                <!--VERIFIED-->
                <td class="table-cell" :class="isManager?'':'bg-info disable-cursor'">
                    <div class="category-title">
                        <el-tag v-if="!isManager" type="danger" class="width-100 text-center">Manager Only
                        </el-tag>
                        <span v-else>&nbsp;</span>
                    </div>
                    <el-collapse-transition>
                        <div v-show="category.show" class="list-group">
                            <draggable class="list-group"
                                       :list="category.verified"
                                       v-bind="dragOptions"
                                       :disabled="!isManager"
                                       @change="log($event, category.verified, category.info.id, 'VERIFIED')">
                                <TaskItem :is-manager="isManager"
                                          :project-id="projectId"
                                          class="list-group-item"
                                          v-for="task in category.verified"
                                          :key="task.id"
                                          @taskDeleted="loadData"
                                          @taskChange="taskChange($event, task)"
                                          :task="task"/>
                            </draggable>
                        </div>
                    </el-collapse-transition>
                </td>
            </tr>
            <tr>
                <td colspan="4" class="text-center">
                    <el-divider v-if="isManager">
                        <CategoryDialog :project-id="projectId" @categorySaved="loadData"/>
                    </el-divider>
                    <el-divider v-else></el-divider>
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
    import TaskService from "@/service/task.service";
    import CategoryService from "@/service/category.service";

    export default {
        name: "ProjectTask",
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
            taskChange(data, task) {
                let vm = this;
                vm.$utils.setAttrs(vm, task, data);
            },
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
            archiveCategory(id) {
                let vm = this;
                AlertService.confirm("Confirm archive category?", function () {
                    CategoryService.archive(id)
                        .then(() => {
                            AlertService.success("Category archived successfully!");
                            vm.loadData();
                        })
                        .catch(() => {
                            AlertService.error("Category archived failed");
                            vm.loadData();
                        });
                });
            },
            loadData() {
                let vm = this;
                vm.isLoading = false;
                ProjectService.getTask(vm.projectId).then(response => {
                    vm.isLoading = false;
                    vm.project = response;
                }).catch(err => {
                    AlertService.error(err.message);
                });
            },
            updateTask(task, cb) {
                let vm = this;
                TaskService.updatePosition(task)
                    .then(response => {
                        if (cb) cb();
                    })
                    .catch(error => {
                        if (error.status === 403)
                            AlertService.error(error.message)
                    })
            },
            updateListTask(tasks) {
                let vm = this;
                TaskService.updateListPosition(tasks).then(response => {
                    vm.loadData();
                });
            },
            toggleCategory(category) {
                category.show = !category.show;
                this.$set(category, 'show', category.show);
            },
            log(e, category, categoryId, status) {
                let vm = this;
                if (e.added) {
                    const idx = e.added.newIndex;
                    let update = this.getNewPos(idx, category);
                    let newPos = update.newPos;
                    vm.$utils.setAttrs(vm, e.added.element, {categoryId: categoryId, status: status, pos: newPos});
                    vm.updateTask(e.added.element, function () {
                        if (update.updateList) vm.updateListTask(category);
                    });
                } else if (e.removed) {
                    // do nothing
                } else {
                    const idx = e.moved.newIndex;
                    let update = this.getNewPos(idx, category);
                    let newPos = update.newPos;
                    vm.$utils.setAttrs(vm, e.moved.element, {pos: newPos});
                    vm.updateTask(e.moved.element, function () {
                        if (update.updateList) vm.updateListTask(category);
                    });
                }
            },
            getNewPos(idx, category) {
                const increment = Math.pow(2, 16);
                let before = category[idx - 1], after = category[idx + 1], current = category[idx];
                let newPos = current.pos;
                let updateList = false;

                if (before && after) {
                    /* Neu co the truoc va sau thi lay trung binh */
                    newPos = Math.floor((before.pos + after.pos) / 2);
                    if (newPos === before.pos || newPos === after.pos || newPos === 0) updateList = true;
                } else if (before) {
                    /* New co the truoc */
                    if (before.pos >= current.pos) /* Neu the truoc lon hon the hien tai thi tang */
                        newPos = before.pos + increment;
                } else if (after) {
                    if (after.pos <= current.pos) {
                        newPos = Math.floor(after.pos / 2);
                        if (newPos === after.pos || newPos === 0) updateList = true;
                    }
                }
                return {
                    newPos: newPos,
                    updateList: updateList
                }
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
