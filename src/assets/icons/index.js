/*
 * @Author: Lvhz
 * @Date: 2020-09-10 11:21:12
 * @Descripttion: 图标自动导入，利用webpack的require.context。 最终在main.js中引入
 */
import Vue from 'vue';
import Icon from '@/components/Icon';

// 返回的req是只去加载svg目录中模块的函数
// 参数1：读取指定目录下的文件
// 参数2：是否递归
// 参数3：匹配规则
const req = require.context('./svg', false, /\.svg$/);
console.log(req.keys());

req.keys().map(req);

// Icon组件全局注册一下
Vue.component('Icon', Icon);
