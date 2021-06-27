<!--
 * @Author: Lvhz
 * @Date: 2020-09-14 10:30:22
 * @Descripttion: Descripttion
-->
<template>
  <div>
    <h2>用户登录</h2>
    <div>
      <input v-model="username" type="text">
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'admin'
    };
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', { username: this.username })
        .then(() => {
          this.$router.push({
            path: this.$route.query.redirect || '/'
          });
        })
        .catch(error => {
          console.warn(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
