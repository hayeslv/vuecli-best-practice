<!--
 * @Author: Lvhz
 * @Date: 2020-09-01 14:42:38
 * @Descripttion: 树形组件
-->
<template>
  <div id="app">
    <ul>
      <Item class="item" :model="treeData"></Item>
    </ul>
  </div>
</template>

<script>
import Item from './Item.vue';
export default {
  name: 'app',
  components: { Item },
  data() {
    return {
      treeData: {
        title: 'wer全栈架构师',
        children: [
          {
            title: 'Java架构师'
          },
          {
            title: 'JS高级',
            children: [
              {
                title: 'ES6'
              },
              {
                title: '动效'
              }
            ]
          },
          {
            title: 'web全栈',
            children: [
              {
                title: 'Vue',
                expand: true,
                children: [
                  {
                    title: '组件化'
                  },
                  {
                    title: '源码'
                  },
                  {
                    title: 'docker部署'
                  }
                ]
              }
            ]
          },
          {
            title: 'React',
            children: [
              {
                title: 'JSX'
              },
              {
                title: '虚拟DOM'
              }
            ]
          },
          {
            title: 'Node'
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
