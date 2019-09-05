<template>
    <p>Activate page</p>
</template>

<script>
    import AccountService from "@/api/account"
    export default {
        name: "Activate",
        created(){
            console.log(this.$route.query.key);
            AccountService.activateAccount(this.$route.query.key)
        }
    }
</script>

<style scoped>

</style>