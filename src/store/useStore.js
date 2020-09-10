/*
 * @Author: Lvhz
 * @Date: 2020-09-03 10:16:04
 * @Descripttion: Descripttion
 */
import Vue from 'vue';
import KVuex from './vue-store';

Vue.use(KVuex);

export default new KVuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state, num = 1) {
      state.count += num;
    }
  },
  getters: {
    score(state) {
      return 'score:' + state.count;
    }
  },
  actions: {
    asyncAdd({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('add');
          resolve({ ok: 1 });
        }, 1000);
      });
    }
  }
});
