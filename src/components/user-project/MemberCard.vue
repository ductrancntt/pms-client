<template>
    <el-card shadow="never">
        <div class="row align-center">
            <UserAvatar :size="35" :user="user" class="padding-right-10"/>
            <div class="flex">
                <span style="font-weight: 500">{{user.firstName}} {{user.lastName}}</span>
                <br>
                <span>{{user.email}}</span>
            </div>
            <div class="pointer" v-if="isManager && !isCurrentUser">
                <el-dropdown trigger="click">
                    <el-icon name="more"></el-icon>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="changeRole('ROLE_MEMBER')" v-if="role === 'ROLE_MANAGER'">
                            <el-icon name="sort" />Switch to Member
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="changeRole('ROLE_MANAGER')" v-else>
                            <el-icon name="sort" />Switch to Manager
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="removeMember(user)">
                            <el-icon name="close" />Remove
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </el-card>
</template>

<script>
    import UserAvatar from "@/components/UserAvatar";
    import AuthService from "@/service/auth.service";
    import UserProjectService from "@/service/user-project.service";
    import AlertService from "@/service/alert.service";

    export default {
        name: "MemberCard",
        components: {UserAvatar},
        computed: {
          isCurrentUser(){
              return AuthService.getCurrentUser().id === this.user.id;
          }
        },
        props: {
            user: Object,
            role: String,
            projectId: Number,
            isManager: Boolean,
        },
        methods: {
            removeMember(user) {
                let vm = this;
                AlertService.confirm("Confirm remove " + user.firstName, function () {
                    UserProjectService.deleteMember({
                        userId: user.id,
                        projectId: vm.projectId,
                    }).then(res => vm.$emit("updateUserRole")).catch(err => AlertService.error("Error remove member"));
                });

            },
            changeRole(role){
                let vm = this;
                let payload = {
                    user: {
                        id: vm.user.id,
                    },
                    projectId: vm.projectId,
                    role: role,
                };
                UserProjectService.update(payload).then(res => {
                    vm.$emit("updateUserRole");
                }).catch(error => AlertService.error("Error update user project role"));
            }
        }
    }
</script>

<style scoped>
    /deep/.el-card__body{
        padding: 10px;
    }
</style>
