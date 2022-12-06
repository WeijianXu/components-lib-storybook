import Vue, { VNode } from 'vue';
// import { Route } from 'vue-router';

// 布局模板加 -Tpl 后缀
/**
 * 空内容布局模板，支持背景色和背景图片的设置
 */
export declare class TplEmpty extends Vue {
  /**
   * 背景颜色
   */
  bgColor?: string;

  /**
   * 背景图地址
   */
  bgUrl?: string;

  /**
   * slot插槽对象
   */
  $slots: {
    /**
     * 布局主体内容区域
     */
    '': VNode[];

    /**
     * 页脚区域
     */
    footer: VNode[];
  };
}
