<!--
 * @Author: Lvhz
 * @Date: 2020-08-31 11:19:42
 * @Descripttion: Descripttion
-->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter.js';
export default {
  name: 'Form',
  componentName: 'Form',
  mixins: [emitter],
  provide() {
    return {
      form: this // 传递Form实例给后代，比如FormItem用来校验
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    validate(cb) {
      // map的结果是若干Promise数组
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate());
      // const tasks = this.broadcast('FormItem', 'validate', []);

      // 所有任务必须全部成功才算校验通过
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
