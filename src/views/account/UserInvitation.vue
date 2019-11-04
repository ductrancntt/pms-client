<template>
    <div class="width-100 row h-center padding-20">
        <el-col :span="8">
            <el-alert
                    v-if="!userInvitations.length"
                    title="Empty!"
                    type="info"
                    :closable="false"
                    description="You're currently have no invitation"
                    show-icon>
            </el-alert>
            <el-card shadow="never" v-for="invite in userInvitations" :key="invite.invitation.id">
                <div class="row v-center">
                    <div class="padding-right-20 row v-center">
                        <UserAvatar :size="35" :user="invite.inviter"/>
                    </div>
                    <div class="flex" style="font-size: 13pt">
                        <span style="font-weight: 500">{{invite.inviter.firstName}} {{invite.inviter.lastName}}</span>
                        <span> invite you to </span>
                        <span style="font-weight: 500">{{invite.project.name}}</span>
                    </div>
                    <div>
                        <el-button @click="response(invite, true)" type="text" style="font-size: 18pt; padding: 0"
                                   class="text-success" icon="el-icon-check"></el-button>
                        <el-button @click="response(invite, false)" type="text" style="font-size: 18pt; padding: 0"
                                   class="text-danger" icon="el-icon-close"></el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </div>
</template>

<script>
    import UserInvitationService from "@/service/user-invitation.service";
    import UserAvatar from "@/components/UserAvatar";
    import AlertService from "@/service/alert.service";

    export default {
        name: "UserInvitation",
        components: {UserAvatar},
        data() {
            return {
                userInvitations: []
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            response(invite, status) {
                let vm = this;
                if (!status) {
                    AlertService.confirm("Reject project invitation?", function () {
                        UserInvitationService.responseToInvitation({
                            invitationId: invite.invitation.id,
                            accept: status
                        }).then(res => {
                            AlertService.success("You've rejected to join " + invite.project.name);
                            vm.loadData();
                        }).catch(error => AlertService.error(error.message));
                    })
                } else {
                    UserInvitationService.responseToInvitation({
                        invitationId: invite.invitation.id,
                        accept: status
                    }).then(res => {
                        AlertService.success("You've been added to " + invite.project.name);
                        vm.$router.push({name: 'project', params: {id: invite.project.id}});
                        vm.loadData();
                    }).catch(error => AlertService.error(error.message));
                }

            },
            loadData() {
                let vm = this;
                UserInvitationService.getByCurrentUser().then(res => {
                    vm.userInvitations = res;
                });
            }
        }
    }
</script>

<style scoped>

</style>
