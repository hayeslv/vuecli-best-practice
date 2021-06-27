<!--
 * @Author: Lvhz
 * @Date: 2020-09-01 14:42:53
 * @Descripttion: 节点
-->
<template>
  <!-- hidden选项存在则不显示 -->
  <li v-if="!model.hidden">
    <div @click="toggle">
      <!-- 图标 -->
      <Icon v-if="model.meta && model.meta.icon" :icon-class="model.meta.icon"></Icon>
      <!-- 标题 -->
      <span v-if="isFolder">
        <span v-if="model.meta && model.meta.title">{{ model.meta.title }}</span>
        <!-- 有子元素就显示 -->
        <span>[{{ open ? '-' : '+' }}]</span>
      </span>
      <!-- 如果是叶子节点，渲染链接 -->
      <template v-else>
        <router-link v-if="model.meta && model.meta.title" :to="resolvePath(model.path)">{{ model.meta.title }}</router-link>
      </template>
      
    </div>
    <!-- 子树 -->
    <ul v-show="open" v-if="isFolder">
      <!-- 必须有结束条件 -->
      <Item 
        v-for="route in model.children" 
        :key="route.path" 
        class="item" 
        :model="route"
        :base-path="resolvePath(model.path)"
      ></Item>
    </ul>
  </li>
</template>

<script>
import path from 'path';
export default {
  name: 'Item', // name对递归组件是必须的
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    basePath: {
      type: String,
      default: ''
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
    },
    // 拼接父path和子path为完整path
    resolvePath(routePath) {
      console.log(routePath);
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
