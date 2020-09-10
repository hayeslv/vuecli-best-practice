/*
 * @Author: Lvhz
 * @Date: 2020-05-07 09:23:14
 * @Descripttion: 业务层面处理请求/响应
 */
import HttpClient from './HttpClient.js';
// import router from '@/router';
// import { responseCode } from '@/constant/requestCode.js';
// import { getToken, removeStorage } from '@/common/storage.js';
// import { MessageBox } from 'element-ui';

const config = {
  baseURL: process.env.VUE_APP_API_URL || '/api',
  timeout: 60000
};

const httpClient = new HttpClient(config);
const instance = httpClient.httpInstance;
instance.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器 管理token
// instance.interceptors.request.use(
//   config => {
//     // 这里也可以使用vuex管理token
//     const token = getToken();
//     if (token) {
//       config.headers.common['Authorization'] = 'Bearer ' + token;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// 响应拦截
instance.interceptors.response.use(
  async response => {
    // header config在这里处理就可以了，应用层只需要数据
    const { data } = response;
    // const path = router.currentRoute.path; // 当前路径
    // if (data.code === responseCode.TOKEN_TIMEOUT) {
    //   // token过期
    //   MessageBox.confirm('返回登录页', '登录过期', {
    //     confireButtonText: '登录',
    //     showCancelButton: false,
    //     type: 'warning'
    //   }).then(() => {
    //     removeStorage('userinfo');
    //     router.replace({ path: '/login', query: { redirect: path }}); // 跳回登录页
    //   });
    //   return;
    // }
    // if (data.code === responseCode.NO_PERMISSION) {
    //   // 权限不足
    //   router.replace({ path: '/login', query: { redirect: path }}); // 跳回登录页
    //   return data;
    // }
    return data;
  }
);

export default httpClient;


// /**
//  * 获取文件buffer
//  * @param {string} url 文件链接地址
//  * @returns {Promise<ArrayBuffer>}
//  */
// export function getFileBuffer(url) {
//   return service({
//     url,
//     method: 'GET',
//     responseType: 'arraybuffer'
//   });
// }

// /**
//  * 下载文件
//  * @param {string} url 文件链接地址
//  * @param {string} name 文件名
//  * @returns {Promise<boolean>}
//  */
// export async function download(url, name) {
//   try {
//     const res = await getFileBuffer(url);
//     const blob = new Blob([res]);
//     const fileUrl = window.URL.createObjectURL(blob);
//     let link = document.createElement('a');
//     link.download = name;
//     link.href = fileUrl;
//     link.click();
//     link = null;
//     window.URL.revokeObjectURL(fileUrl);
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

// /**
//  * 下载文件流
//  * @param {string} url 文件链接地址
//  * @param {ArrayBuffer} buffer 文件流
//  * @param {string} name 文件名
//  * @returns {Promise<boolean>}
//  */
// export async function downloadFileByArraybuffer(buffer, name) {
//   try {
//     const blob = new Blob([buffer]);
//     const fileUrl = window.URL.createObjectURL(blob);
//     let link = document.createElement('a');
//     link.download = name;
//     link.href = fileUrl;
//     link.click();
//     link = null;
//     window.URL.revokeObjectURL(fileUrl);
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

