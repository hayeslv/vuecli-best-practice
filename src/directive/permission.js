/*
 * @Author: Lvhz
 * @Date: 2020-09-14 16:49:03
 * @Descripttion: 该指令通过传递进来的权限数组和当前用户角色数组过滤
 * @Descripttion: 如果用户拥有要求的权限则可以看到，否则删除指令挂钩的dom元素
 */
import store from '@/store';
export default {
  // el-挂载的dom
  // binding：v-permission="[]" 
  inserted(el, binding) {
    // 获取值
    const { value: permissionRoles } = binding;
    console.log(binding);
    // 获取用户角色
    const roles = store.getters.roles;
    // 合法性判断
    if (permissionRoles && Array.isArray(permissionRoles) && permissionRoles.length > 0) {
      // 判断用户角色中是否有要求的
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role);
      });

      // 如果没有权限，则删除当前dom
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error('需要指定数组类型的权限，如v-permission="[xxx]"');
    }
  }
};
