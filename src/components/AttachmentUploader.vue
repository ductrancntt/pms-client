<template>
    <el-upload
            :disabled="disabled"
            ref="upload"
            class="width-100"
            action="#"
            multiple
            :on-change="checkFile"
            :auto-upload="false">
        <el-button :disabled="disabled" class="width-100" :type="type" slot="trigger" :size="size">
            <el-icon name="paperclip"/>
            {{text}}
        </el-button>
    </el-upload>
</template>

<script>
    import AlertService from "@/service/alert.service";
    import constants from "@/constants";

    export default {
        name: "AttachmentUploader",
        props: {
            onChange: Function,
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
            checkFile(file, fileList){
                let vm = this;
                if (file.size >= constants.MAX_FILE_SIZE * 1024 * 1024 ){
                    AlertService.error("Maximum file size is 20MB");
                    vm.clearFiles();
                }
                console.log(file);
                this.onChange();
            },
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
