import Vue, { VNode } from 'vue';
import { RawLocation } from 'vue-router';

export declare class BaseLink extends Vue {
  /**
   * 跳转的链接，支持 vue-router 对象
   */
  to?: RawLocation;

  /**
   * 路由跳转时，开启 replace 将不会向 history 添加新记录
   *
   * @default false
   */
  replace?: boolean;

  /**
   * 相当于 a 链接的 target 属性
   *
   * @default '_self'
   */
  target?: string;

  /**
   * 同 vue-router append
   *
   * @default false
   */
  append?: boolean;

  /**
   * 点击事件回调
   * @public
   *
   * @param new_window false 是否打开新的浏览器窗口
   */
  handleClick(new_window: boolean): void;

  /**
   * 点击事件回调，阻止默认行为
   * @public
   *
   * @param new_window false 是否打开新的浏览器窗口
   */
  handleCheckClick(event: Event, new_window: boolean): void;
}

export declare class Link extends BaseLink {
  /**
   * 禁用按钮选项
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * 图标类型
   */
  icon?: string;

  /**
   * 是否截断文本，默认宽度 100%，可自行设置
   *
   * @default false
   */
  ellipsis?: boolean;

  /**
   * slot插槽对象
   */
  $slots: {
    /**
     * 内容区域
     */
    '': VNode[];
  };
}
