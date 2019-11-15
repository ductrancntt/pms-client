<template>
    <a @click="goToUser" class="item-link" style="font-weight: 500; color: #026AA7; cursor: pointer">{{user.firstName}}
        {{user.lastName}}</a>
</template>

<script>
    import AuthService from "@/service/auth.service";

    export default {
        name: "UsernameLink",
        props: {
            user: Object,
            isRouter: {
                type: Boolean,
                default: true,
            }
        },
        methods: {
            goToUser() {
                let vm = this;
                if (vm.isRouter) {
                    if (AuthService.getCurrentUser().id != vm.user.id)
                        vm.$router.push({name: 'userInfo', params: {username: vm.user.username}})
                    else vm.$router.push({name: 'profile'})

                    // this.$router.push({name: 'userProfile', params: {username: this.user.username}});
                }
            }
        }
    }
</script>

<style scoped>
    .item-link:hover {
        text-decoration: underline;
    }
</style>
