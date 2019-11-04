<template>
    <span>
        <el-tag size="mini" type="info" v-if="text === 'NO_PROGRESS'">No Progress</el-tag>
        <el-tag size="mini" type="warning" v-else-if="text === 'IN_PROGRESS'">In Progress</el-tag>
        <el-tag size="mini" type="success" v-else-if="text === 'COMPLETED'">Completed</el-tag>
        <el-tag size="mini" type="success" effect="dark" v-else>Verified</el-tag>
    </span>
</template>

<script>
    export default {
        name: "TaskStatus",
        props: {
            text: String
        }
    }
</script>

<style scoped>

</style>
