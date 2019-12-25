<template>
    <el-drawer
            :before-close="hide"
            :destroy-on-close="true"
            :visible.sync="visible"
            direction="rtl"
            ref="drawer"
            size="60%">
        <div class="row v-center" slot="title">
            <div class="flex">Task Detail</div>
            <div class="row v-center padding-right-20" v-if="isManager && !isArchived">
                <el-button @click="submit" size="mini" type="primary" v-if="editMode">
                    <el-icon name="circle-check"/>
                    Save
                </el-button>
                <el-button @click="deleteTask" plain size="mini" type="danger" v-if="!editMode">
                    <el-icon name="delete"/>
                    Delete
                </el-button>
                <el-button @click="toggleEditMode" size="mini">
                    <span v-if="editMode"><el-icon name="circle-close"/> Cancel</span>
                    <span v-else><el-icon name="edit"/> Edit</span>
                </el-button>
            </div>
        </div>
        <div class="padding-20 height-100" v-if="task.id" v-loading="isLoading">
            <div class="column" v-if="!editMode">
                <div class="row" id="basic">
                    <table class="table">
                        <tr>
                            <td colspan="2">Name: <span style="font-weight: 500">{{task.name}}</span></td>
                        </tr>
                        <tr>
                            <td>Created by:
                                <UsernameLink :user="task.creator"/>
                            </td>
                            <td>Start/Due Date:
                                <span style="font-weight: bold" v-if="task.estimateStartDate || task.estimateEndDate">
                                    <span v-if="task.estimateStartDate">{{task.estimateStartDate | moment("DD/MM/YYYY")}}</span>
                                        <el-icon name="right"/>
                                    <span v-if="task.estimateEndDate">{{task.estimateEndDate | moment("DD/MM/YYYY")}}</span>
                                </span>
                                <span v-else>
                                    <el-tag size="mini" type="info">Not set</el-tag>
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
                                    <div :key="user.id" style="align-items: flex-end"
                                         v-for="user in task.assignedUsers">
                                        <UserAvatar :size="25" :user="user" shape="circle" style="padding-right: 3px"/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="task.status === 'IN_PROGRESS'">
                            <td colspan="2">
                                <span>Progress:</span>
                                <el-slider
                                        :disabled="isArchived"
                                        @change="updateProgress"
                                        show-input
                                        v-model="task.progress">
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
                    <Attachment :attachment="att" :key="att.id" class="margin-left-5"
                                v-for="att in task.attachments"/>
                </div>
                <div id="report" v-if="task.status === 'COMPLETED' || task.status === 'VERIFIED' && task.reports.length !== 0">
                    <el-divider content-position="left">Report</el-divider>
                    <el-card class="report-card" :body-style="{padding: '10px'}" shadow="never">
                        <div class="column">
                            <div>
                                <el-card class="margin-bottom-10" :key="att.id" shadow="never" v-for="att in task.reports">
                                    <div class="row align-center">
                                        <div class="column flex">
                                        <span class="flex" style="font-weight: 500">
                                            <Attachment :attachment="att" size="medium"/>
                                        </span>
                                            <span v-html="att.description"></span>
                                            <span class="padding-right-10 padding-top-10"
                                                  style="font-style: italic; font-size: 10pt">
                                            <span>
                                                Uploaded by
                                            <UsernameLink :user="att.createdBy"/> at
                                            </span>
                                            <span><el-tag size="mini" type="info">{{att.createdDate | moment("HH:mm DD/MM/YYYY")}}</el-tag></span>
                                        </span>
                                        </div>
                                        <div v-if="isImage(att)">
                                            <el-image
                                                    style="width: 70px; height: 70px; border: 1px dashed #aaa"
                                                    :src="att.url"
                                                    :preview-src-list="[att.url]">
                                            </el-image>
                                        </div>
                                    </div>
                                </el-card>
                            </div>
                            <div v-if="task.status !== 'VERIFIED'">
                                <AttachmentUploader :disabled="isArchived" :on-change="changeReportFile" ref="reportUploader" size="mini" text="Submit files" type="info"/>
                            </div>
                            <div class="padding-top-10 padding-bottom-10" v-if="hasReportFile">
                                <el-button size="mini" @click="submitReport" type="primary">Upload</el-button>
                                <el-button size="mini" @click="clearFiles">Clear</el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
                <div id="comment-thread">
                    <el-divider content-position="left">Comment</el-divider>
                    <Comment :disabled="isArchived" :task-id="task.id"/>
                </div>

                <div id="activity" v-loading="isLoadingActivity">
                    <el-divider content-position="left">Activities</el-divider>
                    <div :key="act.id" v-for="act in activities">
                        <Activity :activity="act" :key="act.id"/>
                        <el-divider class="margin-10"/>
                    </div>

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
                                <el-select class="width-100" default-first-option placeholder="Select"
                                           v-model="task.priority">
                                    <el-option
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            v-for="item in taskPriority">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="11">
                            <el-form-item>
                                <InputLabel label="Assign To"/>
                                <el-select class="width-100"
                                           multiple
                                           placeholder="Select users"
                                           v-model="task.assignUserIds">
                                    <el-option
                                            :key="item.id"
                                            :label="item.firstName + ' ' + item.lastName"
                                            :value="item.id"
                                            v-for="item in task.unassignedUsers">
                                        <span style="float: left"><UserAvatar :is-router="false" :user="item"/></span>
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
                                        end-placeholder="End date"
                                        format="dd/MM/yyyy"
                                        range-separator="To"
                                        start-placeholder="Start date"
                                        type="daterange"
                                        v-model="dateRange">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-form-item>
                            <InputLabel label="Members in Task (Click avatar to remove)"/>
                            <div class="row">
                                <div :key="user.id" style="align-items: flex-end" v-for="user in task.assignedUsers">
                                    <UserAvatar :is-router="false" :size="25" :user="user" @click.native="removeUser(user)"
                                                shape="circle" style="padding-left: 3px"/>
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
                        <Attachment :attachment="att" :key="att.id" :on-close="removeAttachment"
                                    :removable="editMode"
                                    class="margin-left-5"
                                    v-for="att in task.attachments"/>
                        <AttachmentUploader ref="attachmentUploader" style="width: 100%" text="Attach file"/>
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
    import Activity from "@/components/activity/Activity";
    import UsernameLink from "@/components/UsernameLink";

    export default {
        name: "TaskDrawer",
        components: {
            UsernameLink,
            Activity, Attachment, AttachmentUploader, TaskStatus, TaskPriority, Comment, UserAvatar
        },
        props: {
            projectId: Number,
            taskId: Number,
            isManager: {
                type: Boolean,
                required: true,
                default: false,
            },
            isArchived: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                hasReportFile: false,
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
                dateRange: [],
                selectedFiles: [],
                selectedReports: [],
                activities: [],
            }
        },
        methods: {
            isImage(att){
              return att.type.includes("image");
            },
            changeReportFile(){
                let vm = this;
                if (vm.$refs.reportUploader && vm.$refs.reportUploader.getUploadFiles().length !== 0) vm.hasReportFile = true;
                else vm.hasReportFile = false;
                console.log(vm.hasReportFile);
            },
            clearFiles() {
                let vm = this;
                vm.$refs.reportUploader.clearFiles();
                vm.changeReportFile();
            },
            removeUser(user) {
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
                vm.dateRange = [];
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
                    vm.dateRange = [vm.task.estimateStartDate ? vm.task.estimateStartDate : undefined,
                        vm.task.estimateEndDate ? vm.task.estimateEndDate : undefined]
                    vm.isLoading = false;
                });
            },
            show() {
                let vm = this;
                vm.visible = true;
                vm.isLoading = true;
                setTimeout(function () {
                    vm.loadTaskContent();
                    setTimeout(function () {
                        vm.loadTaskActivities();
                    }, 500)
                }, 400);
            },
            hide(done) {
                this.visible = false;
                this.editMode = false;
                done();
            },
            submitReport(){
                let vm = this;
                let params = new FormData();
                let isTaskReport = true;
                params.append("dto", new Blob([JSON.stringify(vm.task)], {type: 'application/json'}));
                params.append("isTaskReport", new Blob([JSON.stringify(isTaskReport)], {type: 'application/json'}));
                vm.selectedReports = vm.$refs.reportUploader.getUploadFiles();
                vm.selectedReports.forEach(file => {
                    params.append("files", file.raw);
                });

                TaskService.update(params).then(response => {
                    // vm.editMode = false;
                    // vm.$emit("taskUpdated", vm.task);
                    vm.clearFiles();
                    vm.loadTaskContent();
                    // vm.loadTaskActivities();
                }).catch(err => AlertService.error("Error"))
            },
            submit() {
                let vm = this;
                let params = new FormData();
                vm.isSaving = true;
                vm.task.estimateStartDate = vm.dateRange[0];
                vm.task.estimateEndDate = vm.dateRange[1];
                let isTaskReport = false;
                params.append("dto", new Blob([JSON.stringify(vm.task)], {type: 'application/json'}));
                params.append("isTaskReport", new Blob([JSON.stringify(isTaskReport)], {type: 'application/json'}));
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

    .report-card {
        background: #ddd;
    }
</style>
