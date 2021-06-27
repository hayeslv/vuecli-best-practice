/*
 * @Author: Lvhz
 * @Date: 2020-09-14 10:41:44
 * @Descripttion: 做全局路由
 */
import router from './router';
import store from './store';
import { getToken } from '@/utils/auth'; // 从cookie中获取令牌

const whiteList = [
  '/login'
];

router.beforeEach(async(to, from, next) => {
  const token = getToken();

  if (token) {
    console.log(to.path);
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // 已登录，获取用户角色
      const roles = store.getters.roles && store.getters.roles.length > 0;
      console.log(roles);
      if (roles) {
        next();
      } else {
        // 还没有获取角色，先请求用户信息
        const { roles } = await store.dispatch('user/getInfo');

        // 根据角色生成动态路由
        const asyncRoutes = await store.dispatch('permission/generateRoutes', roles);

        // 添加至router
        router.addRoutes(asyncRoutes);

        // 重定向
        next({ ...to, replace: true });
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
    
  }
  
});
