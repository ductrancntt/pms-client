<template>
    <el-upload
            :disabled="disabled"
            ref="upload"
            class="width-100"
            action="#"
            multiple
            :auto-upload="false">
        <el-button class="width-100" :type="type" slot="trigger" :size="size">
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
            size: {
                type: String,
                default: 'mini'
            },
            type: {
                type: String,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false,
            }
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
