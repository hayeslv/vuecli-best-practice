/*
 * @Author: Lvhz
 * @Date: 2020-05-20 17:10:40
 * @Descripttion: Descripttion
 */ 
// import { orderManageApi } from '@/utils/request/api.js';
import { getToken, setToken, removeToken } from '@/utils/auth';

const state = {
  // _id: '',
  // email: '',
  // token: ''
  token: getToken(),
  roles: [] // 用户角色
};

const getters = {
  // _id: state => state._id,
  // email: state => state.email,
  // token: state => state.token
  token: state => state.token,
  roles: state => state.roles
};

// mutations在外界使用commit调用
const mutations = {
  // m_user(state, user = {}) {
  //   state._id = user.id;
  //   state.email = user.email;
  // },
  // m_token(state, token) {
  //   localStorage.setItem('token', token);
  //   state.token = token;
  // }
  m_token(state, token) {
    state.token = token;
  },
  m_roles(state, roles) {
    state.roles = roles;
  }
};

// actions中做ajax调用，actions在外界使用dispatch调用
// 复杂业务组合，例如有一个动作需要mutation 3个不同的值，这时就只需要action一次就行了
const actions = {
  // login: async({ state, commit }, data) => {
  //   // 异步新增订单
  //   const res = await orderManageApi.addBuyOrder(data);
  //   commit('m_token', res.data.token);
  //   return res;
  // },
  // detail: async({ state, commit }, data) => {
  //   const res = await orderManageApi.addBuyOrder(data);
  //   if (res.code === 0) {
  //     commit('m_user', res.data);
  //     return res;
  //   }
  // }

  // 用户登录业务
  login: ({ commit }, userInfo) => {
    const { username } = userInfo;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' || username === 'jerry') {
          commit('m_token', username);
          setToken(username);
          resolve();
        } else {
          reject('用户名、密码错误');
        }
      }, 1000);
    });
  },
  // 获取用户信息
  getInfo: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const roles = state.token === 'admin' ? ['admin'] : ['editor'];
        commit('m_roles', roles);
        resolve({ roles });
      }, 1000);
    });
  },
  resetToken: ({ commit }) => {
    return new Promise(resolve => {
      commit('m_token', '');
      commit('m_roles', []);
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
