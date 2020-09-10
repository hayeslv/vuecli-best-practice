/*
 * @Author: Lvhz
 * @Date: 2020-09-01 08:43:15
 * @Descripttion: 事件广播、派发（element-ui源码）
 */

// 注意：componentName是自定义属性

// 自上而下
function broadcast(componentName, eventName, params) {
  // 由当前组件往子组件发广播
  this.$children.forEach(child => {
    const name = child.$options.componentName; // 是否找到相应的组件（通过组件名查找）

    if (name === componentName) {
      // 如果找到该组件了，就由该组件来派发事件（自己给自己派发事件）
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // 如果没找到，则子组件继续递归
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    // 自下而上
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root; // 获取当前组件的父节点或者root节点
      let name = parent.$options.componentName; // 获取父节点的组件名

      // 如果parent存在，并且父节点不是要找的componentName，则继续递归往上查找
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        // 找到componentName了，由其来派发事件
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
