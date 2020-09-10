/*
 * @Author: Lvhz
 * @Date: 2020-09-01 15:45:55
 * @Descripttion: localStorage
 */
export const getStorage = key => {
  return window.localStorage.getItem(key);
};

export const setStorage = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const keyList = {
  TOKEN: 'token'
};
