<template>
    <div class="width-100" v-loading="isLoading">
        <div class="padding-10 row align-right" v-if="isManager">
            <el-button type="primary" @click="showInviteDialog">Invite Member</el-button>
            <InviteDialog ref="inviteDialog" :project-id="projectId"/>
        </div>
        <el-divider content-position="left">
            <el-badge :value="listManager.length" class="item" type="primary">
                <el-tag size="small">Manager</el-tag>
            </el-badge>
        </el-divider>
        <div class="row">
            <div class="width-25" v-for="mem in listManager" :key="mem.user.id">
                <div class="padding-10">
                    <MemberCard
                            @updateUserRole="loadData"
                            :user="mem.user"
                            :project-id="projectId"
                            :role="mem.role"
                            :is-manager="isManager"/>
                </div>
            </div>
        </div>
        <el-divider content-position="left">
            <el-badge :value="listMember.length" class="item" type="primary">
                <el-tag size="small">Member</el-tag>
            </el-badge>
        </el-divider>
        <div class="row">
            <div class="width-25" v-for="mem in listMember" :key="mem.user.id">
                <div class="padding-10">
                    <MemberCard
                            @updateUserRole="loadData"
                            :user="mem.user"
                            :project-id="projectId"
                            :is-manager="isManager"
                            :role="mem.role"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserProjectService from "@/service/user-project.service";
    import AlertService from "@/service/alert.service";
    import MemberCard from "@/components/user-project/MemberCard";
    import InviteDialog from "@/components/user-project/InviteDialog";

    export default {
        name: "ProjectMember",
        components: {InviteDialog, MemberCard},
        props: {
            projectId: Number,
            isManager: Boolean
        },
        data() {
            return {
                isLoading: true,
                members: [],
                listMember: [],
                listManager: [],
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            showInviteDialog() {
                this.$refs.inviteDialog.show();
            },
            loadData() {
                let vm = this;
                console.log("Get members for project: " + vm.projectId);
                UserProjectService.getUserProjectByProjectId(vm.projectId).then(res => {
                    vm.isLoading = false;
                    vm.members = res;
                    vm.listMember = vm.members.filter(member => member.role === 'ROLE_MEMBER');
                    vm.listManager = vm.members.filter(member => member.role === 'ROLE_MANAGER');
                }).catch(err => AlertService.error(err.message));
            },
        }
    }
</script>

<style scoped>

    /deep/.el-divider__text{
        background-color: transparent !important;
    }

</style>
