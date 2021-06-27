/*
 * @Author: Lvhz
 * @Date: 2020-09-08 16:16:06
 * @Descripttion: Descripttion
 */
const path = require('path');
// 将传入的相对路径转换为绝对路径
const resolve = dir => path.join(__dirname, dir);

const port = 8080;
const title = 'vue项目最佳实践';

// 查看当前项目下的所有规则：vue inspect --rules
// 查看某个规则的具体规则：vue inspect --rule vue

module.exports = {
  // publicPath: process.env.VUE_APP_BASEURL,
  publicPath: './',
  configureWebpack: {
    name: title
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@request', resolve('src/utils/request'));
    // config.module.rule('svg')

    // 让原本用于处理svg的规则将文件夹“src/assets/icons”排除在外
    config.module.rule('svg')
      .exclude.add(resolve('src/assets/icons'));

    // 添加 svg-sprite-loader，npm i svg-sprite-loader -D
    // 指定名称为icons（自定义的），测试路由地址/image-use
    config.module.rule('icons')
      .test(/\.svg$/) // 设置test
      .include.add(resolve('src/assets/icons')) // 加入include选项，注意：add操作会改变上下文，这时上下文会进入到数组中
      .end() // 使用end回退
      .use('svg-sprite-loader') // 添加loader
      .loader('svg-sprite-loader') // 切换上下文到svg-sprite-loader
      .options({ symbolId: 'icon-[name]' }) // 指定选项
      .end(); // 可以再配其他loader
  },
  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1, // 开启多cpu打包
  devServer: {
    port
    // proxy: {
    //   '/api/': {
    //     target: 'https://www.dylanlv.com',
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/style/base.scss";`
      }
    }
  }
};
