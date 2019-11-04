<template>
    <span>
        <el-tag size="mini" type="info" v-if="text === 'NONE'">None</el-tag>
        <el-tag size="mini" type="success" v-else-if="text === 'LOW'">Low</el-tag>
        <el-tag size="mini" type="primary" v-else-if="text === 'MEDIUM'">Medium</el-tag>
        <el-tag size="mini" type="warning" v-else-if="text === 'HIGH'">High</el-tag>
        <el-tag size="mini" type="danger" v-else>Very High</el-tag>
    </span>
</template>

<script>
    export default {
        name: "TaskPriority",
        props: {
            text: String
        }
    }
</script>

<style scoped>

</style>
