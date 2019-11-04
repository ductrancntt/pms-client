<template>
    <div>
        <div class="row">
            <div>
                <UserAvatar :size="35" :user="comment.author"/>
            </div>
            <div class="column flex padding-left-10">
                <div class="column" style="background: #F2F3F5; border-radius: 18px; padding: 8px 10px">
                    <div class="row">
                        <div id="content" class="flex">
                            <div v-if="editMode" class="padding-bottom-5 column">
                                <div>
                                    <el-input rows="2" v-model="comment.content" type="textarea"/>
                                </div>
                                <div class="row flex padding-top-10" style="justify-content: flex-end">
                                    <div class="flex">
                                        <AttachmentUploader ref="attachmentUploader" text="Attach file"/>
                                    </div>
                                    <div>
                                        <el-button type="primary" size="mini" @click="updateComment">Save</el-button>
                                        <el-button type="info" size="mini" @click="cancel">Cancel</el-button>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <a style="font-weight: 500; color: #026AA7; cursor: pointer" class="item-link">{{comment.author.firstName}} {{comment.author.lastName}}</a><br>
                                <span style="white-space: pre-wrap;">{{comment.content.trim()}}</span>
                            </div>
                        </div>
                        <div id="action" v-if="!editMode && hasRight">
                            <el-dropdown trigger="click">
                                <el-button type="text">
                                    <el-icon name="more"/>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="editMode = true"><i class="el-icon-edit"></i>Edit
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="deleteComment(comment.id)">
                                        <i class="el-icon-delete"></i>Delete
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>

                        </div>
                    </div>
                    <div class="row" style="justify-content: flex-end">
                        <el-tag class="margin-left-5" style="cursor: pointer" @click="" size="mini"
                                v-for="att in comment.attachments" :key="att.id">
                            <el-icon name="paperclip"/>
                            <a :href="att.url" download>{{att.name}}</a>
                            <el-icon v-if="editMode" @click.native="removeAttachment(att)" style="font-size: 12pt; padding: 0 0 0 8px"
                                     name="close"/>
                        </el-tag>
                    </div>
                </div>
                <div class="row padding-top-5" style="justify-content: flex-end">
                    <el-tag class="margin-right-5" v-if="comment.edited" type="info" size="mini">Edited</el-tag>
                    <el-tag type="info" size="mini">{{comment.createdDate | moment('HH:mm - DD/MM/YYYY')}}</el-tag>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserAvatar from "@/components/UserAvatar";
    import CommentService from "@/service/comment.service";
    import AlertService from "@/service/alert.service";
    import AuthService from "@/service/auth.service";
    import AttachmentUploader from "@/components/AttachmentUploader";

    export default {
        name: "CommentItem",
        components: {AttachmentUploader, UserAvatar},
        props: {
            commentProps: {
                type: Object,
                required: true
            },
            taskId: {
                type: Number,
                required: true,
            }
        },
        computed: {
            hasRight() {
                return AuthService.getCurrentUser().id === this.commentProps.author.id;
            }
        },
        created() {
            this.comment = this.commentProps;
        },
        data() {
            return {
                editMode: false,
                comment: {
                    id: null,
                    content: '',
                    edited: null,
                    taskId: null,
                    removeAttachments: [],
                    attachments: [],
                    author: null,
                    createdDate: null,
                    lastModifiedDate: null
                },
                selectedFiles: [],
            }
        },
        methods: {
            reset() {
                this.editMode = false;
                this.selectedFiles = [];
            },
            removeAttachment(att) {
                if (!this.comment.removeAttachments) this.comment.removeAttachments = [];
                this.comment.removeAttachments.push(att);
                this.comment.attachments = this.comment.attachments.filter(a => a.id !== att.id)
            },
            cancel() {
                this.editMode = false;
                this.comment = this.commentProps;
                this.selectedFiles = [];
            },
            updateComment() {
                let vm = this;
                let params = new FormData();
                vm.comment.taskId = vm.taskId;
                params.append("dto", new Blob([JSON.stringify(vm.comment)], {type: 'application/json'}));
                vm.selectedFiles = vm.$refs.attachmentUploader.getUploadFiles();
                vm.selectedFiles.forEach(file => {
                    params.append("files", file.raw);
                });
                CommentService.update(params).then(onSuccess).catch(onError);

                function onSuccess(data) {
                    vm.reset();
                    console.log(data);
                    vm.comment = data;
                    // vm.$emit("updateComment", data);
                }

                function onError(data) {
                    AlertService.error("Error");
                }
            },
            deleteComment(id) {
                let vm = this;
                AlertService.confirm("Delete this comment?", function () {
                    CommentService.delete(id).then(res => {
                        vm.$emit("updateComment", id);
                    });
                });

            }
        }
    }
</script>

<style scoped>
    /deep/ .el-card__header {
        padding: 10px;
    }

    .item-link:hover {
        text-decoration: underline;
    }
    /deep/textarea{
        border-radius: 12px;
    }
</style>
