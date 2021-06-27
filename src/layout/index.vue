<!--
 * @Author: Lvhz
 * @Date: 2020-09-10 15:47:03
 * @Descripttion: 默认布局
-->
<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <!-- <sidebar class="sidebar-container"></sidebar> -->
    <SideMenu></SideMenu>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/SideMenu';
export default {
  components: { SideMenu }
};
</script>

<style lang="scss" scoped>

</style>
