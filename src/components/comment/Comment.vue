<template>
    <div>
        <div id="comment-body" class="column padding-bottom-20">
            <div class="row">
                <div class="flex">
                    <el-input type="textarea" v-model="comment.content"
                              placeholder="Type your comment here"
                              rows="2"></el-input>
                    <div class="padding-top-10">
                        <el-button type="primary" size="small" :disabled="!comment.content || isCommenting"
                                   @click="submit">
                            Add Comment
                        </el-button>
                    </div>
                </div>
                <div style="width: 100px;" class="padding-left-10">
                    <AttachmentUploader style="width: 100%" ref="attachmentUploader" text="Attach file"/>
                </div>
            </div>
            <div>
            </div>
        </div>
        <div id="comment-logs">
            <CommentItem class="padding-bottom-10" v-for="item in listComment"
                         :key="item.id"
                         :comment-props="item"
                         :task-id="taskId"
                         @updateComment="loadComments"
            />
        </div>


    </div>
</template>

<script>
    import AttachmentUploader from "@/components/AttachmentUploader";
    import CommentService from "@/service/comment.service";
    import AlertService from "@/service/alert.service";
    import CommentItem from "@/components/comment/CommentItem";

    export default {
        name: "Comment",
        components: {CommentItem, AttachmentUploader},
        props: {
            taskId: {
                type: Number,
                required: true,
            }
        },
        data() {
            return {
                isCommenting: false,
                comment: {
                    id: null,
                    content: '',
                    taskId: null,
                },
                listComment: [],
                selectedFiles: [],
            }
        },
        created() {
            this.loadComments();
        },
        methods: {
            loadComments() {
                let vm = this;
                CommentService.getByTask(this.taskId).then(response => {
                    console.log(response);
                    vm.listComment = response;
                }).catch(error => AlertService.error("Error loading comment!"));
            },
            reset() {
                let vm = this;
                vm.comment = {};
                vm.selectedFiles = [];
                vm.$refs.attachmentUploader.clearFiles();
            },
            submit() {
                let vm = this;
                let params = new FormData();
                vm.isCommenting = true;
                vm.comment.taskId = vm.taskId;
                params.append("dto", new Blob([JSON.stringify(vm.comment)], {type: 'application/json'}));
                vm.selectedFiles = vm.$refs.attachmentUploader.getUploadFiles();
                vm.selectedFiles.forEach(file => {
                    params.append("files", file.raw);
                });

                CommentService.create(params).then(onSuccess).catch(onError);

                function onSuccess(data) {
                    vm.isCommenting = false;
                    vm.reset();
                    vm.loadComments();
                }

                function onError(data) {
                    AlertService.success("Error");
                }
            }
        }
    }
</script>

<style scoped>

</style>
