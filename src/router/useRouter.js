/*
 * @Author: Lvhz
 * @Date: 2020-09-01 16:26:39
 * @Descripttion: 类似router/index.js
 */

import Vue from 'vue';
import Home from '../views/RouteTest/Home.vue';
import About from '../views/RouteTest/About.vue';

import VueRouter from './vue-router';

// 插件注册
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
});

