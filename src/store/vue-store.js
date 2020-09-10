/*
 * @Author: Lvhz
 * @Date: 2020-09-03 10:00:32
 * @Descripttion: vuex插件
 */
// 任务
// 1、维护状态state
// 2、修改状态commit
// 3、业务逻辑控制dispatch
// 4、状态派发getter
// 5、实现state响应式
// 6、插件
// 7、混入

let Vue;

function install(_Vue) {
  Vue = _Vue;

  // 混入：把store选项指定到Vue原型上
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  });
}

class Store {
  // options: { state: {count: 0}, mutations: {count(state) {}} }
  constructor(options = {}) {
    // 利用vue的数据响应式
    this.state = new Vue({
      data: options.state
    });

    // 初始化mutations
    this.mutations = options.mutations || {};
    // 初始化actions
    this.actions = options.actions || {};

    options.getter && this.handleGetters(options.getter);
  }

  // 触发mutations，需要实现commit方法
  commit = (type, arg) => {
    // this指向Store实例
    const fn = this.mutations[type]; // 获取变更函数
    fn(this.state, arg);
  }

  dispatch = (type, arg) => {
    const fn = this.actions[type];
    return fn({ commit: this.commit, state: this.state }, arg);
  }

  // {getters: {score(state){return state.xx}}
  handleGetters(getters) {
    this.getters = {}; // store实例上的getters

    // 定义只读的属性
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state);
        }
      });
    });
  }
}

// Vuex
export default { Store, install };
