
import Vue from 'vue';

// 创建指定组件实例并挂载于body上
export default function create(Component, props) {
  // 0、先创建一个vue实例
  const vm = new Vue({
    render(h) { // render方法给我们提供一个h函数（creatElement的别名），它可以渲染VNode
      return h(Component, { props });
    }
  }).$mount(); // 这里可以先不挂载，之后手动的进行挂载($mount中传参是空)

  // 1、上面vm帮我们创建了组件实例
  // Ctor = Vue.extend({data:xxx}) // 构造函数，这里不用这个方法

  // 2、通过$children获取该组件实例
  const comp = vm.$children[0]; // vm.$root，这里children只有一个组件

  // 3、追加至body
  document.body.appendChild(vm.$el);

  // 4、清理函数
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };

  // 5、返回组件实例
  return comp;
}
