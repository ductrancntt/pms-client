<template>
    <div class="row flex padding-10">
        <div class="flex padding-right-10">
            <el-card shadow="never">
                <div class="column" style="min-height: 150px;">
                    <div class="flex">
                        <AttachmentUploader ref="attachmentUploader" size="large" text="Select files" type="info"/>
                    </div>
<!--                    <el-divider></el-divider>-->
                    <div class="padding-top-20">
                        <el-input type="textarea" v-model="description" placeholder="Description" />
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <el-button @click="submit" type="primary">Upload</el-button>
                        <el-button @click="clearFiles">Clear</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="flex-2">
            <div style="min-height: 150px;">
                <el-alert
                        :closable="false"
                        description="No attachment"
                        show-icon
                        title="Empty!"
                        type="info"
                        v-if="listAttachments.length <= 0">
                </el-alert>
                <div v-else>
                    <el-card class="margin-bottom-10" :key="att.id" shadow="never" v-for="att in listAttachments">
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
                            <div class="row v-center">
                                <el-image v-if="isImage(att)"
                                          style="width: 70px; height: 70px; border: 1px dashed #aaa"
                                        :src="att.url"
                                        :preview-src-list="[att.url]">
                                </el-image>
                                <div class="padding-left-20">
                                    <el-button @click="deleteAttachment(att)" icon="el-icon-delete" size="small"
                                               v-if="currentUser.id === att.createdBy.id">Delete
                                    </el-button>
                                </div>
                            </div>

                        </div>

                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AttachmentUploader from "@/components/AttachmentUploader";
    import AttachmentService from "@/service/attachment.service";
    import AlertService from "@/service/alert.service";
    import UsernameLink from "@/components/UsernameLink";
    import Attachment from "@/components/attachment/Attachment";
    import AuthService from "@/service/auth.service";

    export default {
        name: "ProjectResource",
        components: {Attachment, UsernameLink, AttachmentUploader},
        props: {
            projectId: Number,
            isManager: Boolean
        },
        data() {
            return {
                description: null,
                listAttachments: [],
                currentUser: {},
            }
        },
        created() {
            this.loadData();
            this.currentUser = AuthService.getCurrentUser();
        },
        methods: {
            isImage(att){
                return att.type.includes("image");
            },
            submit() {
                let vm = this;
                let params = new FormData();
                params.append("projectId", new Blob([JSON.stringify(vm.projectId)], {type: 'application/json'}));
                params.append("description", new Blob([vm.description], {type: 'application/json'}));
                let selectedFiles = vm.$refs.attachmentUploader.getUploadFiles();
                if (selectedFiles.length <= 0) return;
                selectedFiles.forEach(file => {
                    params.append("files", file.raw);
                });
                AttachmentService.upload(params).then(response => {
                    AlertService.success("Upload successfully");
                    vm.clearFiles();
                    vm.loadData();
                    vm.description = null;
                }).catch(error => {
                    AlertService.error("Upload failed");
                })
            },
            clearFiles() {
                let vm = this;
                vm.$refs.attachmentUploader.clearFiles();
            },
            loadData() {
                let vm = this;
                AttachmentService.getByProjectId(vm.projectId).then(response => {
                    vm.listAttachments = response;
                })
            },
            deleteAttachment(att){
                let vm = this;
                AlertService.confirm("Delete this attachment", function () {
                    AttachmentService.delete(att.id).then(()=> {
                        vm.loadData();
                    }).catch(error => {
                        AlertService.error("Delete failed");
                    })
                });
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-divider__text {
        background-color: transparent !important;
    }
</style>
