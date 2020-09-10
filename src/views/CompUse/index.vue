<!--
 * @Author: Lvhz
 * @Date: 2020-09-01 10:07:30
 * @Descripttion: component组件使用
-->
<template>
  <div>
    <Form></Form>
    <div class="line"></div>
    <button @click="createNotice">创建弹窗实例</button>
    <div class="line"></div>
    <Tree></Tree>
  </div>
</template>

<script>
import Form from '@/components/Form';
import Notice from '@/components/Notice';
import create from '@/utils/create.js';
import Tree from '@/components/Tree';
export default {
  components: { Form, Tree },
  methods: {
    createNotice() {
      create(Notice, {
        title: 'xxx',
        message: 'lalala~~~',
        duration: 3000
      }).show();
    }
  }
};
</script>

<style lang="scss" scoped>
.line{
  height: 2px;
  margin: 20px 0;
  background-color: #ddd;
}
</style>
