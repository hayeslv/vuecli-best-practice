<!--
 * @Author: Lvhz
 * @Date: 2020-09-01 14:42:38
 * @Descripttion: 侧边栏
-->
<template>
  <div id="app">
    <ul>
      <Item 
        v-for="route in permission_routes" 
        :key="route.path" 
        class="item" 
        :model="route"
        :base-path="route.path"
      ></Item>
    </ul>
  </div>
</template>

<script>
import Item from './Item.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'SideMenu',
  components: { Item },
  computed: {
    ...mapGetters(['permission_routes'])
  }
};
</script>

<style lang="scss" scoped>

</style>
