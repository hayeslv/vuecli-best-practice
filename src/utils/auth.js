/*
 * @Author: Lvhz
 * @Date: 2020-09-14 10:44:50
 * @Descripttion: Descripttion
 */
// npm i js-cookie -S

import Cookies from 'js-cookie';

export const getToken = () => {
  return Cookies.get('token');  
};

export const setToken = (token) => {
  return Cookies.set('token', token);
};

export const removeToken = () => {
  return Cookies.remove('token');
};
