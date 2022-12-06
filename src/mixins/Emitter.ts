/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from 'vue-property-decorator';
import { getComponentName } from '../utils/assist';

function broadcast(this: any, componentName: string, eventName: string, params: any) {
  this.$children.forEach((child: Vue) => {
    const name = getComponentName(child);

    if (name === componentName) {
      child.$emit.apply(child, [eventName, params]);
    } else {
      // todo 如果 params 是空数组，接收到的会是 undefined
      broadcast.apply(child, [componentName, eventName, params]);
    }
  });
}

/**
 * 跨组件事件传递
 */
@Component
export default class Emitter extends Vue {
  /**
   * 向父集派发指定的事件 `[eventName]` 到指定的组件 `[componentName]` 上
   *
   * @param componentName 组件名
   * @param eventName 事件名称
   * @param params 参数集合
   */
  public dispatch(componentName: string, eventName: string, params?: any): void {
    let parent = this.$parent || this.$root;
    let name = getComponentName(parent);

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;

      if (parent) {
        name = getComponentName(parent);
      }
    }
    if (parent) {
      parent.$emit.apply(parent, [eventName, params]);
    }
  }

  /**
   * 向子集广播指定的事件 `[eventName]` 到指定的组件 `[componentName]` 上
   *
   * @param componentName 组件名
   * @param eventName 事件名称
   * @param params 参数集合
   */
  public broadcast(componentName: string, eventName: string, params?: any): void {
    broadcast.call(this, componentName, eventName, params);
  }
}
