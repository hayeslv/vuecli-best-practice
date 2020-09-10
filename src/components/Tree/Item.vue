<!--
 * @Author: Lvhz
 * @Date: 2020-09-01 14:42:53
 * @Descripttion: 节点
-->
<template>
  <li>
    <div @click="toggle">
      <!-- 标题 -->
      {{ model.title }}
      <!-- 有子元素就显示 -->
      <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
    </div>
    <!-- 子树 -->
    <ul v-show="open" v-if="isFolder">
      <!-- 必须有结束条件 -->
      <Item v-for="item in model.children" :key="item.title" class="item" :model="item"></Item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'Item', // name对递归组件是必须的
  props: {
    model: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length;
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
