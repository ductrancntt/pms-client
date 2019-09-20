<template>
    <div id="vue-app" :style="{backgroundImage: 'url('+require('@/assets/images/bg.jpg')+')'}">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style lang="scss">
    @import 'assets/style/custom-scrollbar.css';
    @import 'assets/style/element-variables.scss';

    html, body, #vue-app {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    #vue-app {
        display: flex;
    }
</style>
