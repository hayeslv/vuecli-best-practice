/*
 * @Author: Lvhz
 * @Date: 2020-09-03 09:01:18
 * @Descripttion: Descripttion
 */
class Bus {
  constructor() {
    this.callbacks = {};
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach(cb => cb(args));
    }
  }
}

Bus.install = function(Vue) {
  Vue.prototype.$bus = new Bus();
};


export default Bus;
