/*
 * @Author: Lvhz
 * @Date: 2020-08-31 10:09:23
 * @Descripttion: Descripttion
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import router from './router/useRouter'; // 测试自己写的router
import store from './store';

import './assets/icons/index'; // 执行一下就可以了

import Bus from '@/plugins/bus.js';
Vue.use(Bus); // 事件总线

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
