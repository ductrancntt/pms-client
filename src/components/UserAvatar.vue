<template>
    <div :style="{width: size + 'px', height: size+'px'}" class="pointer">
        <el-tooltip @click.native="userProfile" :disabled="!showTooltip" effect="dark"
                    :content="user.firstName + ' ' + user.lastName"
                    placement="bottom">
            <el-avatar :shape="shape" v-if="user.imageUrl != null && user.imageUrl !== ''" :size="size"
                       :src="user.imageUrl">
            </el-avatar>
            <el-avatar v-else :shape="shape"  :size="size" :style="{fontSize: (size*0.4) + 'px'}">
                <span>{{user.firstName[0]}}</span>
            </el-avatar>
        </el-tooltip>
    </div>
</template>

<script>
    export default {
        name: "UserAvatar",
        props: {
            user: Object,
            isRouter: Boolean,
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
            userProfile(){
                if (this.isRouter){
                    console.log('Go to: ' + this.user.username);
                    // this.$router.push({name: 'userProfile', params: {username: this.user.username}});
                }
            }
        }
    }
</script>

<style scoped>

</style>
