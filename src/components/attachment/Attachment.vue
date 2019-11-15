<template>
    <el-tag style="cursor: pointer" @click="download" :size="size">
        <el-icon name="paperclip"/>&nbsp;
        <a href="javascript:void(0)">{{attachment.name}}</a>
        <el-icon v-if="removable" @click.native="remove(attachment)" style="font-size: 12pt; padding: 0 0 0 8px"
                 name="close"/>
    </el-tag>
</template>

<script>
    import FileService from "@/service/file.service";

    export default {
        name: "Attachment",
        props: {
            size: {
                type: String,
                default: 'mini'
            },
            attachment: {
              type: Object,
              required: true,
            },
            removable: {
                type: Boolean,
                default: false,
            },
            onClose: Function
        },
        methods: {
            download(){
                console.log(this.attachment);
                FileService.download(this.attachment.id, this.attachment.name);
            },
            remove(att) {
                this.onClose(att);
            }
        }
    }
</script>

<style scoped>

</style>
