<!--
 * @Author: Lvhz
 * @Date: 2020-08-31 10:29:53
 * @Descripttion: Descripttion
-->
<template>
  <div>
    <Form ref="form" :model="model" :rules="rules">
      <FormItem label="用户名：" prop="username">
        <Input v-model="model.username" />
      </FormItem>
      <FormItem label="密码：" prop="password">
        <Input v-model="model.password" type="password" />
      </FormItem>
      <FormItem>
        <button @click="onLogin">登录</button>
      </FormItem>
    </Form>
    
    {{ model }}
  </div>
</template>

<script>
import Input from './Input.vue';
import FormItem from './FormItem.vue';
import Form from './Form.vue';
export default {
  components: { Input, FormItem, Form },
  data() {
    return {
      model: {
        username: 'dylan',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名必填' }
        ],
        password: [
          { required: true, message: '密码必填' }
        ]
      }
    };
  },
  methods: {
    onLogin() {
      this.$refs.form.validate((isValid) => {
        if (isValid) {
          console.log('登录');
        } else {
          console.log('有错');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
