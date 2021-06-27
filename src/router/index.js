/*
 * @Author: Lvhz
 * @Date: 2020-08-31 10:09:23
 * @Descripttion: Descripttion
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

// -------------------用户权限使用方式---------------------
import Layout from '@/layout'; // 布局页

Vue.use(VueRouter);

// 通用页面
export const constRoutes = [
  {
    path: '/login',
    component: () => import('@/views/PermissionUse/Login'),
    hidden: true // 导航菜单忽略该项
  },
  {
    path: '/',
    component: Layout, // 应用布局
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home.vue'),
        name: 'home',
        meta: {
          title: 'Home', // 导航菜单项标题
          icon: 'qq' // 导航菜单项图标
        }
      },
      {
        path: 'wxhome',
        component: () => import('@/views/Home.vue'),
        name: 'wxhome',
        meta: {
          title: 'wxHome', // 导航菜单项标题
          icon: 'wx' // 导航菜单项图标
        }
      }
    ]
  },
  {
    path: '/test',
    component: () => import('@/views/Test')
  }
];

// 动态路由页面
export const asyncRoutes = [
  {
    path: '/about',
    component: Layout,
    redirect: '/about/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/PermissionUse/About.vue'),
        name: 'about',
        meta: {
          title: 'About',
          icon: 'qq',
          // 角色决定将来哪些用户可以看到该路由
          roles: ['admin', 'editor']
        }
      }
    ]
  }
];

// 假如asyncRoutes来自于服务器。
// 如果需求是每个页面的权限是后台管理系统动态配置的，而不是前端写死的
// 可以当用户登录后向后端请求可访问的路由表，从而动态生成可访问页面，操作和原来是相同的，这里多了一步将后端返回路由表中组件名称和本地的组件映射步骤

// 前端组件名和组件映射表
// const map = {
//   login: require('login/index').default // 同步的方式
//   login: () => import('login/index') // 异步的方式
// }
// // 服务器返回的map类似于
// const serviceMap = [
//   { path: '/login', component: 'login', hidden: true }
// ]
// // 遍历serviceMap，将component替换为map[component]，动态生成asyncRoutes
// function mapConponent(route) {
//   route.component = serviceMap[route.component];
//   if(route.children) {
//     route.children = route.children.map(child => mapConponent(child))
//   }
//   return route;
// }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes
});

// -------------------平常使用方式------------------------
// import Home from '../views/Home.vue';
// import RouteTest from '@/views/RouteTest';
// import List from '@/views/RouteTest/List.vue';
// import Detail from '@/views/RouteTest/Detail.vue';

// import { getStorage, setStorage, keyList } from '@/utils/storage.js';

// Vue.use(VueRouter);

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/comp-use', // 组件使用
//     name: 'CompUse',
//     component: () => import('@/views/CompUse')
//   },
//   {
//     path: '/route-test', // 测试路由
//     name: 'RouteTest',
//     component: RouteTest,
//     children: [
//       { path: '/list', name: 'List', component: List },
//       { path: '/detail/:id', name: 'Detail', component: Detail, props: true } // 动态路由
//     ]
//   },
//   {
//     path: '/image-use', // 组件使用
//     name: 'ImageUse',
//     component: () => import('@/views/ImageUse')
//   },
//   // 路由守卫
//   {
//     path: '/about',
//     name: 'About',
//     meta: { auth: true }, // 需要认证
//     // beforeEnter(to, from, next){ next(); }, // 路由独享守卫
//     component: () => import('@/views/RouteTest/About.vue')
//   }
// ];

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// });

// // 全局守卫
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth && !getStorage(keyList.TOKEN)) {
//     if (window.confirm('请登录')) {
//       setStorage(keyList.TOKEN, '我是token');
//       return next(); // 登录成功，继续下一步
//     } else {
//       return next('/'); // 放弃回首页
//     }
//   }

//   return next(); // 不需要登录，继续
// });

export default router;
