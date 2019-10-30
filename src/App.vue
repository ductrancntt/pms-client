<template>
    <div id="vue-app" class="bg-app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style lang="scss">
    html, body, #vue-app {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    body {
        color: #172b4d;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
    }

    #vue-app {
        display: flex;
    }
</style>
