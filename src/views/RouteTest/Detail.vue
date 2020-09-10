<!--
 * @Author: Lvhz
 * @Date: 2020-09-01 15:24:39
 * @Descripttion: Descripttion
-->
<template>
  <div>
    Detail
    <p>
      $route.params.id：{{ $route.params.id }}
    </p>
    <p>
      id：{{ id }}
    </p>
  </div>
</template>

<script>
export default {
  // 正常是通过$route.params.id来获取，但是当router中设置了props: true的话，这里就可以进行接收了
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  mounted() {
    console.log(this.$route.matched);
  }
};
</script>

<style lang="scss" scoped>

</style>
