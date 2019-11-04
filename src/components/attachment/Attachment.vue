<template>
    <el-tag style="cursor: pointer" @click="" :size="size">
        <el-icon name="paperclip"/>
        <a :href="attachment.url" download>{{attachment.name}}</a>
        <el-icon v-if="removable" @click.native="remove(attachment)" style="font-size: 12pt; padding: 0 0 0 8px"
                 name="close"/>
    </el-tag>
</template>

<script>
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
            remove(att) {
                this.onClose(att);
            }
        }
    }
</script>

<style scoped>

</style>
