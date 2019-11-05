<template>
    <a style="font-weight: 500; color: #026AA7; cursor: pointer" class="item-link">{{user.firstName}} {{user.lastName}}</a>
</template>

<script>
    export default {
        name: "UsernameLink",
        props: {
            user: Object
        }
    }
</script>

<style scoped>
    .item-link:hover {
        text-decoration: underline;
    }
</style>
