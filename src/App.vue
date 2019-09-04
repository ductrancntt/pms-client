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

<style>
  @import './assets/css/custom-scrollbar.css';
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
