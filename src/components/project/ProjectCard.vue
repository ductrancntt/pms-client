<template>
    <el-card shadow="hover" style="cursor: pointer" @click.native="goToProject">
        <div slot="header">
            <span style="font-weight: bold">{{project.name}}</span>

        </div>
        <div class="column">
            <span style="padding: 10px 0">{{project.description}}</span>
            <el-divider></el-divider>
            <div>
                <el-tag size="mini"><i class="el-icon-user-solid"></i> {{totalMember}} Members</el-tag>
            </div>
        </div>
    </el-card>
</template>

<script>
    import UserProjectService from "@/service/user-project.service";

    export default {
        name: "ProjectCard",
        props: {
            project: Object,
        },
        created(){
            let vm = this;
            UserProjectService.countProjectMember(this.project.id).then(response => vm.totalMember = response);
        },
        data(){
            return {
                totalMember: null,
            }
        },
        methods: {
            goToProject(){
                this.$router.push({name: 'project', params: {id: this.project.id}});
            }
        }
    }
</script>

<style scoped>
    /deep/.el-card__body{
        padding: 10px;
    }
    /deep/.el-card__header{
        padding: 8px 10px;
    }
    /deep/.el-divider--horizontal{
        margin: 10px 0;
    }
</style>