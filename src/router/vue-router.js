/*
 * @Author: Lvhz
 * @Date: 2020-09-02 10:18:45
 * @Descripttion: vue-router插件
 */

// 这里不要import Vue，因为将来我这个库打包的时候，不希望将Vue也打包进去
let Vue;

class VueRouter {
  constructor(options) {
    this.$options = options;

    // 创建一个路由path和route映射
    this.routeMap = {};

    // 将来当前路径current需要响应式
    // 利用Vue的响应式原理可以做到这一点
    this.app = new Vue({
      data: {
        current: '/'
      }
    });
  }
  init() {
    // 绑定浏览器事件
    this.bindEvents();

    // 解析路由配置
    this.createRouteMap(this.$options);

    // 创建router-link和router-view
    this.initComponent();
  }
  bindEvents() {
    // 这里监听hash变化，如果想监听url的变化则需要监听popstate
    window.addEventListener('hashchange', this.onHashChange.bind(this));
    window.addEventListener('load', this.onHashChange.bind(this));
  }
  onHashChange() {
    // http://localhost/#/home
    this.app.current = window.location.hash.slice(1) || '/';
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      // routeMap的结构
      // '/home': {path: '/home', component: Home}
      this.routeMap[item.path] = item;
    });
  }
  initComponent() {
    // 声明两个全局组件
    Vue.component('router-link', {
      props: {
        to: {
          type: String,
          required: true
        }
      },
      render(h) {
        // 目标是：<a :href="to">xxx</a>
        // render函数的写法
        return h('a', { attrs: { href: '#' + this.to }}, this.$slots.default);
        // jsx的写法
        // return <a href={this.to}>{this.$slots.default}</a>;
      }
    });

    // hash => current => render
    Vue.component('router-view', {
      // 箭头函数能保留this指向，这里的this指向VueRouter实例
      render: h => {
        const Comp = this.routeMap[this.app.current].component;
        return h(Comp);
      }
    });
  }
}

// 把VueRouter变为插件，这个插件以后会接收到Vue的实例
VueRouter.install = function(_Vue) {
  Vue = _Vue; // 这里保存，上面使用

  // 混入任务，混入就是扩展Vue
  Vue.mixin({
    beforeCreate() {
      // 这里的代码将来会在外面初始化的时候被调用
      // 这样我们就实现了Vue的扩展
      // this是谁？这个this就是Vue的组件实例
      // 但是这里只希望根组件执行一次，这里的$options.router，就是main.js中new Vue时，配置项的router
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
      
    }
  });
};

export default VueRouter;
