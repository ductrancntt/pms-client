<template>
    <div style="margin: 5px">
        <el-card shadow="never">
            <span>{{task.name}}</span>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "TaskItem",
        props: {
            task: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
