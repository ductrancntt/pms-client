<template>
    <div id="kanban">
        <el-row type="flex" justify="end" class="padding-10">
            <el-button type="primary">Add Category</el-button>
            <el-button type="primary">Add Task</el-button>
        </el-row>
        <table class="table" v-drag-and-drop:options="options">
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
            <tr class="table-row" v-for="category in project.categories" :key="category.id">
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
                        <div style="padding: 0 10px; flex: 1">
                            <el-tag style="width: 100%;">{{category.name}}</el-tag>
                        </div>
                        <div>
                            <el-dropdown trigger="click">
                                <el-tag class="el-dropdown-link" style="cursor: pointer">
                                    <i class="el-icon-more"></i>
                                </el-tag>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><i class="el-icon-circle-plus-outline"></i>Add Task</el-dropdown-item>
                                    <el-dropdown-item><i class="el-icon-edit"></i>Edit</el-dropdown-item>
                                    <el-dropdown-item><i class="el-icon-collection-tag"></i>Archive</el-dropdown-item>
                                    <el-dropdown-item><i class="el-icon-delete"></i>Delete</el-dropdown-item>
                                    <el-dropdown-item><i class="el-icon-s-order"></i>Reorder</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>

                    <el-collapse-transition>
                        <div v-show="category.show">
                            <TaskItem v-for="task in category.noProgress" :key="task.id" :task="task"/>
                            <div style="padding: 5px">
                                <el-button type="primary" class="border-dashed width-100">
                                    Add a task
                                </el-button>
                            </div>
                        </div>
                    </el-collapse-transition>
                </td>
                <td class="table-cell">
                    <div class="category-title">
                        <span>&nbsp;</span>
                    </div>
                    <el-collapse-transition>
                        <div v-show="category.show">
                            <TaskItem v-for="task in category.inProgress" :key="task.id" :task="task"/>
                        </div>
                    </el-collapse-transition>
                </td>
                <td class="table-cell">
                    <div class="category-title">
                        <span>&nbsp;</span>
                    </div>
                    <el-collapse-transition>
                        <div v-show="category.show">
                            <TaskItem v-for="task in category.done" :key="task.id" :task="task"/>
                        </div>
                    </el-collapse-transition>
                </td>
                <td class="table-cell">
                    <div class="category-title">
                        <span>&nbsp;</span>
                    </div>
                    <el-collapse-transition>
                        <div v-show="category.show">
                            <TaskItem v-for="task in category.confirmed" :key="task.id" :task="task"/>
                        </div>
                    </el-collapse-transition>
                </td>
            </tr>
            <tr>
                <td colspan="4" class="text-center">
                    <el-divider>
                        <el-button type="primary" class="border-dashed">
                            Add a Category
                        </el-button>
                    </el-divider>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import TaskItem from "@/views/project/task/TaskItem";

    export default {
        name: "ProjectContent",
        components: {TaskItem},
        data() {
            return {
                project: {
                    id: 1,
                    name: "Project 1",
                    categories: [
                        {
                            id: 1,
                            name: "September",
                            show: true,
                            noProgress: [
                                {id: 1, name: "Item 1", categoryId: 1},
                                {id: 2, name: "Item 2", categoryId: 1},
                            ],
                            inProgress: [
                                {id: 3, name: "Item 3", categoryId: 1},
                            ],
                            done: [
                                {id: 4, name: "Item 4", categoryId: 1},
                                {id: 5, name: "Item 5", categoryId: 1}
                            ],
                            confirmed: [
                                {id: 6, name: "Item 6", categoryId: 1}
                            ]
                        },
                        {
                            id: 2,
                            name: "October",
                            show: true,
                            noProgress: [
                                {id: 7, name: "Item 7", categoryId: 2},
                                {id: 8, name: "Item 8", categoryId: 2},
                            ],
                            inProgress: [],
                            done: [
                                {id: 9, name: "Item 9", categoryId: 2},
                                {id: 10, name: "Item 10", categoryId: 2},
                                {id: 11, name: "Item 11", categoryId: 2}
                            ],
                            confirmed: [
                                {id: 12, name: "Item 12", categoryId: 2}
                            ]
                        }
                    ]
                },
                options: {
                    dropzoneSelector: ".drag-inner-list",
                    draggableSelector: ".drag-item"
                }
            }
        },
        methods: {
            toggleCategory(category) {
                console.log(category);
                category.show = !category.show;
                this.$set(category, 'show', category.show);
            }
        }
    }
</script>

<style scoped>
    .border-dashed {
        border: 1px dashed #aebacc;
    }

    #kanban .table .table-cell:first-of-type {
        border-left-width: 0;
    }

    .table-cell {
        padding: 5px;
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
