<template>
    <el-card shadow="never">
        <div class="row">
            <div>
                <UserAvatar :user="activity.createdBy" />
            </div>
            <div>
                {{activity.createdBy.firstName}} {{activity.createdBy.lastName}} -
                {{activity.type}} - {{activity.target}} - {{activity.createdTime | moment("HH:mm - DD/MM/YYYY")}}
            </div>
        </div>
    </el-card>
</template>

<script>
    import UserAvatar from "@/components/UserAvatar";
    export default {
        name: "Activity",
        components: {UserAvatar},
        props: {
            activity: Object,
        }
    }
</script>

<style scoped>

</style>
