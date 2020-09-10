/*
 * @Author: Lvhz
 * @Date: 2020-09-03 16:24:37
 * @Descripttion: 编译器
 */

import { Watcher } from './vue.js';

// 遍历dom结构，解析指令和插值表达式
// eslint-disable-next-line no-unused-vars
class Compile {
  // el-待编译的模板，vm-Vue实例
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    // 把模板中的内容移到片段中去操作，保持操作的效率的一致性
    this.$fragment = this.node2Fragment(this.$el);
    // 执行编译
    this.compile(this.$fragment);
    // 放回$el中
    this.$el.appendChild(this.$fragment);
  }

  node2Fragment(el) {
    const fragment = document.createDocumentFragment();
    let child;
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if (node.nodeType === 1) {
        // 元素
        // console.log('编译元素' + node.nodeName);
        this.compileElement(node);
      } else if (this.isInteger(node)) {
        // 只关心{{xxx}}，这种结构的文本节点
        // console.log('编译插值文本' + node.textContent);
        this.compileText(node);
      }

      // 递归子节点
      if (node.children && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }

  isInteger(node) {
    // node.textContent：访问node节点的文本内容
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  // 编译element
  compileElement(node) {
    // 关心属性
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      // 规定：v-xxx="yyy"
      const attrName = attr.name; // v-xxx
      const exp = attr.value; // yyy
      if (attrName.indexOf('v-') === 0) {
        // 指令
        const dir = attrName.substring(2); // xxx
        // 执行
        this[dir] && this[dir](node, exp);
      }
    });
  }

  // 编译文本，文本替换
  compileText(node) {
    console.log(RegExp.$1); // 拿到分组内容
    console.log(this.$vm[RegExp.$1]);

    // 表达式
    const exp = RegExp.$1;
    this.update(node, exp, 'text'); // 等同于v-text
    
  }

  update(node, exp, dir) {
    const updator = this[dir + 'Updator'];

    updator && updator(node, this.$vm[exp]); // 首次初始化
    
    // 创建Watcher实例，依赖收集就完成了
    new Watcher(this.$vm, exp, function(value) {
      updator && updator(node, value);
    });
  }

  textUpdator(node, value) {
    node.textContent = value;
  }

  text(node, exp) {
    this.update(node, exp, 'text');
  }
}
