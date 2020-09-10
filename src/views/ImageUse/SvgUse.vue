<!--
 * @Author: Lvhz
 * @Date: 2020-09-10 11:17:12
 * @Descripttion: 自动化svg
-->
<template>
  <div>
    <!-- 这里是原生方式使用svg -->
    <!-- <svg>
      <use xlink:href="#icon-wx"></use>
    </svg>
    <svg>
      <use xlink:href="#icon-qq"></use>
    </svg> -->

    <!-- 组件使用svg -->
    <Icon icon-class="qq" class-name="icon"></Icon>
    <Icon icon-class="wx" class-name="icon"></Icon>
  </div>
</template>

<script>
// import '@/assets/icons/svg/wx.svg'; 有了自动导入，这行代码就不需要了
export default {
};
</script>

<style lang="scss" scoped>
.icon{
  font-size: 50px;
  color: blue;
}
</style>
