<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
  @import 'assets/style/custom-scrollbar.css';
  @import 'assets/style/element-variables.scss';
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
