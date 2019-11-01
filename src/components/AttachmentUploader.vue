<template>
    <el-upload
            ref="upload"
            class="width-100"
            action="#"
            multiple
            :auto-upload="false">
        <el-button class="width-100" slot="trigger" size="mini">
            <el-icon name="paperclip"/>
            {{text}}
        </el-button>
    </el-upload>
</template>

<script>
    export default {
        name: "AttachmentUploader",
        props: {
            text: String,
        },
        methods: {
            getUploadFiles() {
                let vm = this;
                return vm.$refs.upload.uploadFiles;
            },
            clearFiles() {
                let vm = this;
                vm.$refs.upload.clearFiles();
            }
        }
    }
</script>

<style scoped>

</style>
