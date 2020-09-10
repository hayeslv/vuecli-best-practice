/*
 * @Author: Lvhz
 * @Date: 2020-05-20 17:10:40
 * @Descripttion: Descripttion
 */ 
import { orderManageApi } from '@/utils/request/api.js';

const state = {
  _id: '',
  email: '',
  token: ''
};

const getters = {
  _id: state => state._id,
  email: state => state.email,
  token: state => state.token
};

// mutations在外界使用commit调用
const mutations = {
  m_user(state, user = {}) {
    state._id = user.id;
    state.email = user.email;
  },
  m_token(state, token) {
    localStorage.setItem('token', token);
    state.token = token;
  }
};

// actions中做ajax调用，actions在外界使用dispatch调用
// 复杂业务组合，例如有一个动作需要mutation 3个不同的值，这时就只需要action一次就行了
const actions = {
  login: async({ state, commit }, data) => {
    // 异步新增订单
    const res = await orderManageApi.addBuyOrder(data);
    commit('m_token', res.data.token);
    return res;
  },
  detail: async({ state, commit }, data) => {
    const res = await orderManageApi.addBuyOrder(data);
    if (res.code === 0) {
      commit('m_user', res.data);
      return res;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
