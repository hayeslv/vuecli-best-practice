<!--
 * @Author: Lvhz
 * @Date: 2020-08-31 10:35:14
 * @Descripttion: Descripttion
-->
<template>
  <div>
    <!-- 自定义组件要实现v-model，必须实现:value ，@input -->
    <!-- $arrt存储的是props之外的部分 -->
    <input :value="value" v-bind="$attrs" @input="onInput">
  </div>
</template>

<script>
import emitter from '@/mixins/emitter.js';
export default {
  name: 'Input',
  componentName: 'Input',
  mixins: [emitter],
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    }
  }, // 避免顶层容器继承属性
  methods: {
    onInput(e) {
      // 通知父组件数值变化
      this.$emit('input', e.target.value);

      // 通知FormItem校验
      // this.$parent.$emit('validate');
      this.dispatch('FormItem', 'validate', e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
