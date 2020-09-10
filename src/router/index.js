/*
 * @Author: Lvhz
 * @Date: 2020-08-31 10:09:23
 * @Descripttion: Descripttion
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import RouteTest from '@/views/RouteTest';
import List from '@/views/RouteTest/List.vue';
import Detail from '@/views/RouteTest/Detail.vue';

import { getStorage, setStorage, keyList } from '@/utils/storage.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/comp-use', // 组件使用
    name: 'CompUse',
    component: () => import('@/views/CompUse')
  },
  {
    path: '/route-test', // 测试路由
    name: 'RouteTest',
    component: RouteTest,
    children: [
      { path: '/list', name: 'List', component: List },
      { path: '/detail/:id', name: 'Detail', component: Detail, props: true } // 动态路由
    ]
  },
  {
    path: '/image-use', // 组件使用
    name: 'ImageUse',
    component: () => import('@/views/ImageUse')
  },
  // 路由守卫
  {
    path: '/about',
    name: 'About',
    meta: { auth: true }, // 需要认证
    // beforeEnter(to, from, next){ next(); }, // 路由独享守卫
    component: () => import('@/views/RouteTest/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 全局守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !getStorage(keyList.TOKEN)) {
    if (window.confirm('请登录')) {
      setStorage(keyList.TOKEN, '我是token');
      return next(); // 登录成功，继续下一步
    } else {
      return next('/'); // 放弃回首页
    }
  }

  return next(); // 不需要登录，继续
});

export default router;
