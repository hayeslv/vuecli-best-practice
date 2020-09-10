<!--
 * @Author: Lvhz
 * @Date: 2020-08-31 11:15:53
 * @Descripttion: Descripttion
-->
<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <!-- 校验信息 -->
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import Schema from 'async-validator';
export default {
  name: 'FormItem',
  componentName: 'FormItem',
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      errorMessage: ''
    };
  },
  mounted() {
    // 监听校验事件、并执行监听
    this.$on('validate', () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 执行组件校验
      // 1、获取校验规则
      const rules = this.form.rules[this.prop];

      // 2、获取数据
      const value = this.form.model[this.prop];

      // 3、执行校验 npm i async-validator -S
      const desc = {
        [this.prop]: rules
      };
      const schema = new Schema(desc);
      // 参数1是值，参数2是错误对象数组
      // 返回的是Promise
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          // 有错
          this.errorMessage = errors[0].message;
        } else {
          // 没错则清除错误信息
          this.errorMessage = '';
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
