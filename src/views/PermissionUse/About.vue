<!--
 * @Author: Lvhz
 * @Date: 2020-09-14 11:01:27
 * @Descripttion: Descripttion
-->
<template>
  <div class="about">
    About页面
    <!-- 按钮权限 -->
    <button v-permission="['admin', 'editor']">editor button</button>
    <button v-permission="['admin']">admin button</button>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>

</style>
