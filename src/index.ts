import { VueConstructor } from 'vue';
// 页面布局模板
import * as tpls from './layout';

export * from './layout';

// 组件
import * as components from './components';

export * from './components';

const install = function (Vue: VueConstructor /* , opts = {} */): void {
  // if (install.installed) return;

  Object.keys(components).forEach((key) => {
    Vue.component(key, (components as { [index: string]: VueConstructor })[key]);
  });

  Object.keys(tpls).forEach((key) => {
    Vue.component(key, (tpls as { [index: string]: VueConstructor })[key]);
  });

  const { Loading, Toast } = components;
  Vue.prototype.$Loading = Loading;
  Vue.prototype.$Toast = Toast;
};

// auto install, cdn 引入方式时
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  // version: process.env.VERSION,
  install,
  // ...components,
  // ...tplComponents,
};
