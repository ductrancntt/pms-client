<template>
    <div class="home">
        <img alt="Vue logo" src="@/assets/logo.png"/>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <el-button type="success" @click="getProject">Project</el-button>
    </div>
</template>

<script>
    import HelloWorld from '@/components/HelloWorld.vue'
    import AccountService from "@/views/account/account.service";

    export default {
        name: "Home",
        components: {
            HelloWorld
        },
        methods: {
            getProject() {
                AccountService.getProject(1).then(response => {
                    console.log(response);
                }, error => {
                    console.log(error);
                    AccountService.getCurrentAccount().then(response => {
                        console.log(response);
                    }, error => {
                        console.log(error);
                    });
                });

            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>