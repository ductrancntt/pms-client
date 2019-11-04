<template>
    <el-drawer
            ref="drawer"
            :destroy-on-close="true"
            :visible.sync="visible"
            direction="rtl"
            :before-close="hide"
            size="60%">
        <div slot="title" class="row v-center">
            <div class="flex">Task Detail</div>
            <div class="row v-center padding-right-20" v-if="isManager">
                <el-button size="mini" type="primary" v-if="editMode" @click="submit">
                    <el-icon name="circle-check"/>
                    Save
                </el-button>
                <el-button plain size="mini" type="danger" v-if="!editMode" @click="deleteTask">
                    <el-icon name="delete"/>
                    Delete
                </el-button>
                <el-button size="mini" @click="toggleEditMode">
                    <span v-if="editMode"><el-icon name="circle-close"/> Cancel</span>
                    <span v-else><el-icon name="edit"/> Edit</span>
                </el-button>
            </div>
        </div>
        <div v-if="task.id" class="padding-20 height-100" v-loading="isLoading">
            <div v-if="!editMode" class="column">
                <div id="content" class="row">
                    <table class="table">
                        <tr>
                            <td colspan="2">Name: <span style="font-weight: 500">{{task.name}}</span></td>
                        </tr>
                        <tr>
                            <td>Created by:
                                <a style="font-weight: 500; color: #026AA7; cursor: pointer"
                                   class="item-link">{{task.creator.firstName}} {{task.creator.lastName}}</a>
                            </td>
                            <td>Start/Due Date:
                                <span v-if="task.estimateStartDate || task.estimateEndDate">
                                    <span v-if="task.estimateStartDate">{{task.estimateStartDate | moment("DD/MMM")}}</span>
                                        <el-icon name="right"/>
                                    <span v-if="task.estimateEndDate">{{task.estimateEndDate | moment("DD/MMM")}}</span>
                                </span>
                                <span v-else>
                                    <el-tag type="info" size="mini">Not set</el-tag>
                                </span>
                            </td>

                        </tr>
                        <tr>
                            <td>Priority:
                                <TaskPriority :text="task.priority"/>
                            </td>
                            <td>Status:
                                <TaskStatus :text="task.status"/>
                            </td>

                        </tr>
                        <tr>
                            <td>Assigned to:
                                <div class="row">
                                    <div v-for="user in task.users" :key="user.id" style="align-items: flex-end">
                                        <UserAvatar style="padding-right: 3px" :size="25" shape="circle" :user="user"/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <el-divider content-position="left">Description</el-divider>
                    <div class="padding-top-10 padding-bottom-10">
                        <p v-html="task.description? task.description : '<i>No description</i>'"></p>
                    </div>
                </div>
                <div id="attachment" v-if="task.attachments && task.attachments.length > 0">
                    <el-divider content-position="left">Attachment</el-divider>
                </div>

                <div id="comment-thread">
                    <el-divider content-position="left">Comment</el-divider>
                    <Comment :task-id="task.id"/>
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
                        <el-col :span="11">
                            <el-form-item>
                                <InputLabel label="Name"/>
                                <el-input v-model="task.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                        <el-col :span="11">
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

                        <el-col :span="11">
                            <el-form-item>
                                <InputLabel label="Assign To"/>
                                <el-select multiple
                                           class="width-100"
                                           v-model="selectedUser"
                                           @change="change"
                                           placeholder="Select users">
                                    <el-option
                                            v-for="item in task.unassignedUsers"
                                            :key="item.id"
                                            :label="item.firstName + ' ' + item.lastName"
                                            :value="item.id">
                                        <span style="float: left"><UserAvatar :user="item"/></span>
                                        <span class="padding-left-10" style="font-size: 13px">
                                    {{item.firstName}} {{item.lastName}}
                                </span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                        <el-col :span="11">
                            <el-form-item>
                                <InputLabel label="Members in Task"/>
                                <div v-for="user in task.users" :key="user.id" style="align-items: flex-end">
                                    <UserAvatar style="padding-left: 3px" :size="25" shape="circle" :user="user"/>
                                </div>
                            </el-form-item>
                        </el-col>
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
                    <el-form-item>
                        <InputLabel label="Description"/>
                        <ckeditor :class="'ckeditor-content'" :editor="editor" v-model="task.description"
                                  :config="editorConfig"/>
                    </el-form-item>
                    <el-form-item>
                        <InputLabel label="Attachment"/>
                        <AttachmentUploader style="width: 100%" ref="attachmentUploader" text="Attach file"/>
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
    import TaskPriority from "@/components/task/TaskPriority";
    import TaskStatus from "@/components/task/TaskStatus";
    import AlertService from "@/service/alert.service";
    import AttachmentUploader from "@/components/AttachmentUploader";

    export default {
        name: "TaskDrawer",
        components: {AttachmentUploader, TaskStatus, TaskPriority, Comment, UserAvatar},
        props: {
            projectId: Number,
            taskId: Number,
            isManager: {
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
                selectedUser: [],
                selectedFiles: [],
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
                    unassignedUsers: [],
                },
                activities: [],
            }
        },
        methods: {
            change(value) {
                console.log(value);
            },
            toggleEditMode() {
                this.editMode = !this.editMode;
            },
            loadTaskContent() {
                let vm = this;
                vm.isLoading = true;
                TaskService.get(vm.taskId).then(response => {
                    vm.task = response;
                    vm.isLoading = false;
                });
                ActivityService.getByTaskId(vm.taskId).then(res => {
                    console.log(res);
                    vm.activities = res;
                });
            },
            show() {
                let vm = this;
                vm.visible = true;
                vm.loadTaskContent();
            },
            hide(done) {
                console.log('closed');
                this.visible = false;
                this.editMode = false;
                done();
            },
            submit() {
                let vm = this;
                vm.isSaving = true;
                TaskService.update(vm.task).then(response => {
                    vm.editMode = false;
                }).catch(err => AlertService.error("Error"))
            },
            deleteTask() {
                let vm = this;
                AlertService.confirm("Delete this task?", function () {
                    TaskService.delete(vm.taskId).then(res => {
                        vm.visible = false;
                        vm.$refs.drawer.closeDrawer();
                        vm.$emit('deleteTask');
                    }).catch(err => AlertService.error("Error"))
                });

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
        height: 100px;
        min-height: 100px;
    }

    .table {
        width: 100%;
        table-layout: fixed;
        line-height: 2;
        font-size: 11pt;
    }

    .item-link:hover {
        text-decoration: underline;
    }
</style>
