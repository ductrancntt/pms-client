<template>
    <div class="column flex">
        <el-row type="flex" justify="end" class="padding-bottom-20">
            <el-button style="font-size: 14pt; padding: 10px 15px" type="primary" @click="createProject">
                <el-icon name="circle-plus"></el-icon>
                New Project
            </el-button>
        </el-row>
        <el-row class="row flex" :gutter="20">
            <el-col :span="8" class="flex">
                <el-card shadow="never" :body-style="{'min-height': '360px'}">
                    <div slot="header">
                        <span>My Tasks</span>
                    </div>
                    <div>

                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="flex">
                <el-card shadow="never" :body-style="{'min-height': '360px'}">
                    <div slot="header">
                        <span>Notification</span>
                    </div>
                    <div>

                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" class="flex">
                <el-card shadow="never" :body-style="{'min-height': '360px'}">
                    <div slot="header">
                        <span>Project</span>
                    </div>
                    <div>

                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row>
            <el-calendar v-model="currentDate">
            </el-calendar>
        </el-row>
        <ProjectDialog ref="projectDialog" @projectSaved="loadProject"/>
    </div>
</template>

<script>
    import ProjectDialog from "@/views/project/ProjectDialog";
    export default {
        name: "Home",
        components: {ProjectDialog},
        data(){
            return {
                currentDate: new Date()
            }
        },
        methods: {
            createProject() {
                this.$refs.projectDialog.show();
            },
            loadProject(){

            }
        }
    }
</script>

<style scoped>

</style>
