<template>
    <div :style="{width: size + 'px', height: size+'px'}" style="cursor: pointer">
        <el-avatar :shape="shape" v-if="imageUrl != null && imageUrl !== ''" :size="size" :src="imageUrl">
        </el-avatar>
        <el-avatar :shape="shape" v-else :size="size" :style="{fontSize: (size*0.4) + 'px'}">
            <span>
                {{text[0]}}
            </span>
        </el-avatar>
    </div>
</template>

<script>
    export default {
        name: "UserAvatar",
        props: {
            imageUrl: {
                type: String,
            },
            text: {
                type: String,
            },
            size: {
                type: Number,
                default: 30
            },
            shape: {
                type: String,
                default: 'square'
            },
        },
        created() {
            console.log(this.imageUrl);
        }
    }
</script>

<style scoped>

</style>
