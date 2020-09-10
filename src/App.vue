<!--
 * @Author: Lvhz
 * @Date: 2020-08-31 10:09:23
 * @Descripttion: Descripttion
-->
<template>
  <div id="app">
    <router-link class="router-a" to="/">home页面</router-link>
    <router-link class="router-a" to="/about">about页面</router-link>
    <router-link class="router-a" to="/image-use">测试图片页面</router-link>
    <router-view />
  </div>
</template>

<style lang="scss">
body{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}
.router-a{
  display: inline-block;
  margin: 20px;
}
</style>
