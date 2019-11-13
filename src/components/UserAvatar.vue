<template>
    <div :style="{width: size + 'px', height: size+'px'}" class="pointer">
        <el-tooltip :content="user.firstName + ' ' + user.lastName" :disabled="!showTooltip" @click.native="userProfile"
                    effect="dark"
                    placement="bottom">
            <el-avatar :shape="shape" :size="size" :src="user.imageUrl"
                       v-if="user.imageUrl != null && user.imageUrl !== ''">
            </el-avatar>
            <el-avatar :shape="shape" :size="size" :style="{fontSize: (size*0.4) + 'px'}" v-else>
                <span>{{user.firstName[0]}}</span>
            </el-avatar>
        </el-tooltip>
    </div>
</template>

<script>
    import AuthService from "@/service/auth.service";

    export default {
        name: "UserAvatar",
        props: {
            user: Object,
            isRouter: {
                type: Boolean,
                default: true,
            },
            showTooltip: {
                type: Boolean,
                default: true
            },
            size: {
                type: Number,
                default: 30
            },
            shape: {
                type: String,
                default: 'circle'
            },
        },
        created() {
        },
        methods: {
            userProfile() {
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

</style>
