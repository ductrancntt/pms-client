<template>
    <el-drawer
            title="Task"
            :visible.sync="visible"
            direction="rtl"
            size="45%">
        <div class="padding-20">
            <el-form>
                <el-form-item>
                    {{task.name}}
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>
</template>

<script>
    export default {
        name: "TaskDrawer",
        data(){
            return {
                visible: false,
                task: {
                    id: null,
                    name: null,
                    description: null,
                    pos: null,
                    startDate: null,
                    endDate: null,
                    estimateStartDate: null,
                    estimateEndDate: null,
                    status: 'NO_PROGRESS',
                    priority: 'NONE',
                    categoryId: null,
                    overdue: false,
                }
            }
        },
        methods: {
            show(task){
                this.task = task;
                this.visible = true;
            },
            hide(){
                this.visible = false;
            },
            submit(){

            }
        }
    }
</script>

<style scoped>

</style>
