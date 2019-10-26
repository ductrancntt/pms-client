<template>
    <div style="margin: 5px">
        <el-card shadow="never" style="cursor: pointer" @click.native="showDrawer">
            <span>{{task.pos}}</span> -
            <span>{{task.name}}</span> -
            <span>{{task.status}}</span> -
            <span>{{task.categoryId}}</span>
        </el-card>
        <TaskDrawer ref="drawer"/>
    </div>
</template>

<script>
    import TaskDrawer from "@/views/project/task/TaskDrawer";

    export default {
        name: "TaskItem",
        components: {TaskDrawer},
        props: {
            task: {
                type: Object,
                required: true
            }
        },
        methods: {
            showDrawer() {
                this.$refs.drawer.show(this.task);
            }
        }
    }
</script>

<style scoped>

</style>
