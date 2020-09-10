/*
 * @Author: Lvhz
 * @Date: 2020-05-21 11:22:49
 * @Descripttion: Descripttion
 */ 
import http from './index.js';

// 登录注册模块
const loginApi = {
};

// 商品管理
const goodsManageApi = {
};

// 订单管理
const orderManageApi = {
  // 新增购买订单
  addBuyOrder: params => {
    return http.post('/order/buyOrderAdd', params);
  },
  // 编辑购买订单
  updateBuyOrder: params => {
    return http.put('/order/buyOrderEdit', params);
  },
  // 获取“购买订单”列表
  getBuyOrderList: params => {
    return http.get('/order/buyOrderGetList', params);
  },
  // 删除“购买订单”
  deleteBuyOrder: params => {
    return http.delete('/order/buyOrderDelete', params);
  }
};

export {
  loginApi,
  goodsManageApi,
  orderManageApi
};

