<template>
    <el-drawer
            :destroy-on-close="true"
            title="Task Detail"
            :visible.sync="visible"
            direction="rtl"
            :before-close="hide"
            size="50%">
        <div v-if="task.id" class="padding-20 height-100" v-loading="isLoading">
            <div class="text-right padding-bottom-20" v-if="isManager">
                <el-button size="mini" type="primary" v-if="editMode" @click="submit">
                    <el-icon name="circle-check"/>
                    Save
                </el-button>
                <el-button size="mini" type="danger" v-if="!editMode" @click="deleteTask">
                    <el-icon name="delete"/>
                    Delete
                </el-button>
                <el-button size="mini" @click="toggleEditMode">
                    <span v-if="editMode"><el-icon name="circle-close"/> Cancel</span>
                    <span v-else><el-icon name="edit"/> Edit</span>
                </el-button>
            </div>
            <div v-if="!editMode" class="column">
                <div id="content" class="row">
                    <table class="table">
                        <tr>
                            <td>Name: {{task.name}}</td>
                            <td>Created by: {{task.creator.firstName}} {{task.creator.lastName}}</td>
                        </tr>
                        <tr>
                            <td>Start/Due Date: <span v-if="task.estimateStartDate">{{task.estimateStartDate | moment("DD/MMM")}}</span>
                                <el-icon name="right"/>
                                <span v-if="task.estimateEndDate ">{{task.estimateEndDate | moment("DD/MMM")}}</span>
                            </td>
                            <td>Priority: {{task.priority}}</td>
                        </tr>
                        <tr>
                            <td>Status: {{task.status}}</td>
                            <td>Assigned to:
                                <div class="row">
                                    <div v-for="user in task.users" :key="user.id" style="align-items: flex-end">
                                        <el-tooltip effect="dark" :content="user.firstName + ' ' + user.lastName" placement="bottom">
                                            <UserAvatar style="padding-right: 3px" :size="25" shape="circle"
                                                        :image-url="user.imageUrl" :text="user.firstName"/>
                                        </el-tooltip>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr></tr>
                    </table>
                </div>
                <div>
                    <el-divider content-position="left">Description</el-divider>
                    <p v-html="task.description? task.description : '<i>No description</i>'"></p>
                </div>
                <div id="attachment" v-if="task.attachments && task.attachments.length > 0">
                    <el-divider content-position="left">Attachment</el-divider>
                </div>

                <div id="comment-thread">
                    <el-divider content-position="left">Comment</el-divider>
                    <Comment :task-id="task.id" />
                </div>
                <div id="activity">
                    <el-divider content-position="left">Activities</el-divider>
                    <ul>
                        <li class="padding-bottom-5" style="list-style-type: none" v-for="activity in activities">
                            <el-card shadow="never">
                                <div class="row">
                                    <span v-html="activity.content" class="flex"></span>
                                    <span>{{activity.createdDate | moment("HH:mm - DD/MM/YYYY")}}</span>
                                </div>
                            </el-card>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <el-form :model="task">
                    <el-form-item>
                        <el-col :span="16">
                            <el-form-item>
                                <InputLabel label="Name"/>
                                <el-input v-model="task.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <InputLabel label="Priority"/>
                                <el-select class="width-100" default-first-option v-model="task.priority"
                                           placeholder="Select">
                                    <el-option
                                            v-for="item in taskPriority"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <InputLabel label="Description"/>
                        <ckeditor :class="'ckeditor-content'" :editor="editor" v-model="task.description"
                                  :config="editorConfig"/>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-form-item>
                                <InputLabel label="Start Date"/>
                                <el-date-picker class="width-100" type="datetime" v-model="task.estimateStartDate"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                        <el-col :span="11">
                            <el-form-item>
                                <InputLabel label="End Date"/>
                                <el-date-picker class="width-100" type="datetime" v-model="task.estimateEndDate"/>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="Assign To">
                        <el-select multiple
                        placeholder="Select users">

                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-drawer>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import TaskService from "@/service/task.service";
    import UserAvatar from "@/components/UserAvatar";
    import ActivityService from "@/service/activity.service";
    import Comment from "@/components/comment/Comment";
    import AccountService from "@/service/account.service";
    import ProjectService from "@/service/project.service";

    export default {
        name: "TaskDrawer",
        components: {Comment, UserAvatar},
        props: {
            isManager:{
                type: Boolean,
                required: true
            },
        },
        data() {
            return {
                editor: ClassicEditor,
                editMode: false,
                editorConfig: {
                    readOnly: true
                },
                isLoading: false,
                isSaving: false,
                visible: false,
                taskPriority: [
                    {id: 1, label: 'None', value: 'NONE'},
                    {id: 2, label: 'Low', value: 'LOW'},
                    {id: 3, label: 'Medium', value: 'MEDIUM'},
                    {id: 4, label: 'High', value: 'HIGH'},
                    {id: 5, label: 'Very high', value: 'VERY_HIGH'}
                ],
                comments: [],
                commentText: '',
                task: {
                    id: null,
                    name: null,
                    description: null,
                    pos: null,
                    startDate: null,
                    endDate: null,
                    estimateStartDate: null,
                    estimateEndDate: null,
                    status: 'NO_PROGRESS',
                    priority: 'NONE',
                    categoryId: null,
                    overdue: false,
                    creator: {},
                    users: [],
                    attachments: [],
                },
                activities: [],
            }
        },
        methods: {

            loadProjectUser(){
            },
            toggleEditMode() {
                this.editMode = !this.editMode;
            },
            show(task) {
                let vm = this;
                vm.visible = true;
                vm.isLoading = true;
                TaskService.get(task.id).then(response => {
                    console.log(response);
                    vm.task = response;
                    vm.isLoading = false;
                });
                ActivityService.getByTaskId(task.id).then(res => {
                    vm.activities = res;
                });
            },
            hide(done) {
                this.visible = false;
                this.editMode = false;
                done();
            },
            submit() {
                let vm = this;
                vm.isSaving = true;
                TaskService.update(vm.task).then(response => {
                    console.log(response);
                });
            },
            deleteTask(id) {

            }
        }
    }
</script>

<style scoped>
    /deep/ .el-drawer__header {
        margin: 0;
        padding: 10px 20px;
        border-bottom: 1px solid #eee;
    }

    /deep/ .el-drawer__body {
        overflow-y: auto;
        overflow-x: hidden;
    }

    /deep/ .ck-content {
        height: 150px;
        min-height: 150px;
    }

    .table {
        width: 100%;
        table-layout: fixed;
    }
</style>
