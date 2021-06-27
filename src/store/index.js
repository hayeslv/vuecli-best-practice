/*
 * @Author: Lvhz
 * @Date: 2020-08-31 10:09:23
 * @Descripttion: Descripttion
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './user.js';
import permission from './permission.js';

Vue.use(Vuex);

// 使用方式，其中common为模块作用域，这里类似于user
// import { mapGetters, mapMutations, mapActions } from 'vuex';
// ----------getState----------
// computed: {
//   ...mapGetters('common', ['areaCode']),
// },
// ----------mutation----------
// methods: {
//   ...mapMutations('common', ['m_areaCode']),
// }
// ----------dispatch----------
// methods: {
//   ...mapActions('common',['d_areaCode']),
// }

// 模块化
export default new Vuex.Store({
  modules: {
    user,
    permission
  },
  getters: {
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes
  }
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // }
});
