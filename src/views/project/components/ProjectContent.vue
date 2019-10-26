<template>
    <div id="kanban">
        <el-row type="flex" justify="space-between" class="padding-10">
            <div>
                <el-button type="text" @click="$router.go(-1)">
                    <el-icon name="arrow-left"></el-icon>
                    Back
                </el-button>
            </div>
            <div>
                <CategoryDialog :project-id.sync="$route.params.id" @categorySaved="loadData"/>
                <el-button type="primary">Add Task</el-button>
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
                            <el-tag style="cursor: pointer" v-if="!category.show" @click="toggleCategory(category)">
                                <i class="el-icon-arrow-right"></i>
                            </el-tag>
                        </transition>
                        <div class="padding-left-10 padding-right-10 flex">
                            <el-tag class="width-100">{{category.info.name}}</el-tag>
                        </div>
                        <div>
                            <el-dropdown trigger="click">
                                <el-tag class="el-dropdown-link" style="cursor: pointer">
                                    <i class="el-icon-more"></i>
                                </el-tag>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><i class="el-icon-circle-plus-outline"></i>Add Task
                                    </el-dropdown-item>
                                    <el-dropdown-item><i class="el-icon-edit"></i>Edit</el-dropdown-item>
                                    <el-dropdown-item><i class="el-icon-collection-tag"></i>Archive</el-dropdown-item>
                                    <el-dropdown-item><i class="el-icon-delete"></i>Delete</el-dropdown-item>
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
                                <TaskItem class="list-group-item" v-for="task in category.noProgress" :key="task.id"
                                          :task="task"/>
                                <div class="padding-5" slot="footer">
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
                                <TaskItem class="list-group-item" v-for="task in category.inProgress" :key="task.id"
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
                                <TaskItem class="list-group-item" v-for="task in category.completed" :key="task.id"
                                          :task="task"/>
                            </draggable>
                        </div>
                    </el-collapse-transition>
                </td>

                <!--VERIFIED-->
                <td class="table-cell" :class="isProjectAdmin?'':'bg-info'">
                    <div class="category-title">
                        <span>&nbsp;</span>
                    </div>
                    <el-collapse-transition>
                        <div v-show="category.show" class="list-group">
                            <draggable class="list-group"
                                       :list="category.verified"
                                       v-bind="dragOptions"
                                       :disabled="!isProjectAdmin"
                                       @change="log($event, category.verified, category.info.id, 'VERIFIED')">
                                <TaskItem class="list-group-item" v-for="task in category.verified" :key="task.id"
                                          :task="task"/>
                            </draggable>
                        </div>
                    </el-collapse-transition>
                </td>
            </tr>
            <tr>
                <td colspan="4" class="text-center padding-top-20">
                    <el-divider>
                        <CategoryDialog :project-id.sync="$route.params.id" @categorySaved="loadData"/>
                    </el-divider>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import TaskItem from "@/views/project/task/TaskItem";
    import draggable from "vuedraggable";
    import CategoryDialog from "@/views/project/category/CategoryDialog";
    import ProjectService from "@/views/project/project.service";
    import AlertService from "@/service/alert.service";
    import TaskDialog from "@/views/project/task/TaskDialog";
    import TaskService from "@/views/project/task/task.service";

    export default {
        name: "ProjectContent",
        components: {TaskDialog, CategoryDialog, TaskItem, draggable},
        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    group: "task",
                    disabled: false,
                    ghostClass: "ghost",
                };
            }
        },
        data() {
            return {
                isProjectAdmin: false,
                project: {},
                projectTemplate: {
                    info: null,
                    categories: [
                        {
                            show: true,
                            info: null,
                            noProgress: [],
                            inProgress: [],
                            completed: [],
                            verified: [],
                        }
                    ]
                },
            }
        },
        created() {
            let vm = this;
            ProjectService.checkProjectAdmin(this.$route.params.id).then(response => {
                if (response == true) vm.isProjectAdmin = true;
                if (response.data == false) vm.isProjectAdmin = false;
            });
            this.loadData();
        },
        methods: {
            loadData() {
                let vm = this;
                ProjectService.getTask(vm.$route.params.id).then(response => {
                    console.log(response);
                    vm.project = response;
                }).catch(err => {
                    AlertService.error("Error load project data");
                });
            },
            updateTask(task) {
                TaskService.update(task).then(response => {
                    console.log(response);
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
                    let newPos = this.getNewPos(idx, category);
                    vm.$utils.setAttrs(vm, e.added.element, {categoryId: categoryId, status: status, pos: newPos});
                    vm.updateTask(e.added.element);
                } else if (e.removed) {
                    // do nothing
                } else {
                    const idx = e.moved.newIndex;
                    let newPos = this.getNewPos(idx, category);
                    vm.$utils.setAttrs(vm, e.moved.element, {pos: newPos});
                    vm.updateTask(e.moved.element);
                }
            },
            getNewPos(idx, category) {
                const increment = Math.pow(2, 16);
                let before = category[idx - 1], after = category[idx + 1], current = category[idx];
                let newPos = current.pos;

                if (before && after) {
                    /* Neu co the truoc va sau thi lay trung binh */
                    newPos = Math.floor((category[idx - 1].pos + category[idx + 1].pos) / 2);
                } else if (before) {
                    console.log("Before");
                    console.log(before);
                    /* New co the truoc */
                    if (before.pos >= current.pos) /* Neu the truoc lon hon the hien tai thi tang */
                        newPos = category[idx - 1].pos + increment;
                } else if (after) {
                    if (after.pos <= current.pos)
                        newPos = Math.floor(category[idx + 1].pos / 2);
                }
                return newPos;
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
        padding: 5px;
        height: 30px;
    }

    /deep/ .el-divider__text {
        background-color: transparent;

    }

    /deep/ .el-divider {
        background-color: #aaa;
    }
</style>
