import { Vue, Component } from 'vue-property-decorator';
import { uiPre } from '@/config/env';

/**
 * 组件通用混入模式
 * 1. 提供组件前缀混入
 */
@Component
export default class BaseUI extends Vue {
  // 混入的组件需要变更该变量值，在前缀中使用
  public preName = Object.freeze('BaseUI');

  public get pre(): string {
    return Object.freeze(`${uiPre}${this.preName}`);
  }
}
