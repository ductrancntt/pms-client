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
                <div id="basic" class="row">
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
                            <td>
                                <div class="row v-center">
                                    <span>Assigned to:&nbsp;</span>
                                    <div v-for="user in task.assignedUsers" :key="user.id"
                                         style="align-items: flex-end">
                                        <UserAvatar style="padding-right: 3px" :size="25" shape="circle" :user="user"/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <span>Progress:</span>
                                <el-slider
                                        @change="updateProgress"
                                        v-model="task.progress"
                                        show-input>
                                </el-slider>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="description">
                    <el-divider content-position="left">Description</el-divider>
                    <div class="padding-top-10 padding-bottom-10">
                        <p v-html="task.description? task.description : '<i>No description</i>'"></p>
                    </div>
                </div>
                <div id="attachment" v-if="task.attachments && task.attachments.length > 0">
                    <el-divider content-position="left">Attachment</el-divider>
                    <Attachment v-for="att in task.attachments" :key="att.id" class="margin-left-5"
                                :attachment="att"/>
                </div>

                <div id="comment-thread">
                    <el-divider content-position="left">Comment</el-divider>
                    <Comment :task-id="task.id"/>
                </div>

                <div id="activity" v-loading="isLoadingActivity">
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
                                           v-model="task.assignUserIds"
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
                                <InputLabel label="Estimate"/>
                                <el-date-picker
                                        v-model="dateRange"
                                        format="dd/MM/yyyy"
                                        type="daterange"
                                        range-separator="To"
                                        start-placeholder="Start date"
                                        end-placeholder="End date">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-form-item>
                            <InputLabel label="Members in Task (Click avatar to remove)"/>
                            <div class="row">
                                <div v-for="user in task.assignedUsers" :key="user.id" style="align-items: flex-end">
                                    <UserAvatar @click.native="removeUser(user)" style="padding-left: 3px" :size="25" shape="circle" :user="user"/>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item>
                        <InputLabel label="Description"/>
                        <ckeditor :class="'ckeditor-content'" :editor="editor" v-model="task.description"/>
                    </el-form-item>
                    <el-form-item>
                        <InputLabel label="Attachment"/>
                        <Attachment v-for="att in task.attachments" :key="att.id" class="margin-left-5"
                                    :removable="editMode"
                                    :on-close="removeAttachment"
                                    :attachment="att"/>
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
    import Attachment from "@/components/attachment/Attachment";

    export default {
        name: "TaskDrawer",
        components: {Attachment, AttachmentUploader, TaskStatus, TaskPriority, Comment, UserAvatar},
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
                isLoading: false,
                isLoadingActivity: false,
                isSaving: false,
                visible: false,
                taskPriority: [
                    {id: 1, label: 'None', value: 'NONE'},
                    {id: 2, label: 'Low', value: 'LOW'},
                    {id: 3, label: 'Medium', value: 'MEDIUM'},
                    {id: 4, label: 'High', value: 'HIGH'},
                    {id: 5, label: 'Very high', value: 'VERY_HIGH'}
                ],
                task: {
                    id: null,
                    name: null,
                    description: null,
                    pos: null,
                    priority: 'NONE',
                    progress: null,
                    estimateStartDate: null,
                    estimateEndDate: null,
                    startDate: null,
                    endDate: null,
                    status: 'NO_PROGRESS',
                    overdue: false,
                    reminded: false,
                    categoryId: null,
                    creator: {},
                    assignedUsers: [],
                    unassignedUsers: [],
                    assignUserIds: [],
                    removeAssignUserIds: [],
                    attachments: [],
                    removeAttachments: [],
                },
                dateRange: null,
                selectedFiles: [],
                activities: [],
            }
        },
        methods: {
            removeUser(user){
                console.log(user);
                if (!this.task.removeAssignUserIds) this.task.removeAssignUserIds = [];
                this.task.removeAssignUserIds.push(user.id);
                this.task.assignedUsers = this.task.assignedUsers.filter(a => a.id !== user.id)
                this.task.unassignedUsers.push(user);
            },
            removeAttachment(att) {
                if (!this.task.removeAttachments) this.task.removeAttachments = [];
                this.task.removeAttachments.push(att);
                this.task.attachments = this.task.attachments.filter(a => a.id !== att.id)
            },
            reset() {
                let vm = this;
                vm.task = {};
                vm.activities = [];
                vm.selectedFiles = [];
                vm.$refs.attachmentUploader.clearFiles();
            },
            toggleEditMode() {
                this.editMode = !this.editMode;
            },
            loadTaskActivities() {
                let vm = this;
                vm.isLoadingActivity = true;
                ActivityService.getByTaskId(vm.taskId).then(response => {
                    vm.activities = response;
                    vm.isLoadingActivity = false;
                });
            },
            loadTaskContent() {
                let vm = this;
                vm.isLoading = true;
                TaskService.get(vm.taskId).then(response => {
                    vm.task = response;
                    vm.dateRange = [vm.task.estimateStartDate, vm.task.estimateEndDate]
                    vm.isLoading = false;
                });
            },
            show() {
                let vm = this;
                vm.visible = true;
                vm.loadTaskContent();
                vm.loadTaskActivities();
            },
            hide(done) {
                this.visible = false;
                this.editMode = false;
                done();
            },
            submit() {
                let vm = this;
                let params = new FormData();
                vm.isSaving = true;
                vm.task.estimateStartDate = vm.dateRange[0];
                vm.task.estimateEndDate = vm.dateRange[1];
                params.append("dto", new Blob([JSON.stringify(vm.task)], {type: 'application/json'}));
                vm.selectedFiles = vm.$refs.attachmentUploader.getUploadFiles();
                vm.selectedFiles.forEach(file => {
                    params.append("files", file.raw);
                });

                TaskService.update(params).then(response => {
                    vm.editMode = false;
                    vm.$emit("taskUpdated", vm.task);
                    vm.loadTaskContent();
                    vm.loadTaskActivities();
                }).catch(err => AlertService.error("Error"))
            },
            updateProgress() {
                let vm = this;
                let progress = vm.task.progress;
                TaskService.updateProgress(vm.task).then(response => {
                    vm.loadTaskActivities();
                    vm.$emit("taskUpdated", vm.task);
                }).catch(error => {
                    vm.task.progress = progress;
                    AlertService.error("Can't update task progress. Try again!")
                })
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
