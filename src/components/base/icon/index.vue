<template>
  <Icon v-bind="viewiconProps" v-on="$listeners" />
</template>

<script lang="ts">
import { Component, Prop /* , Watch */ } from 'vue-property-decorator';
import BaseUI from '@/mixins/BaseUI';
import { uiPre } from '@/config/env';
import Icon from 'view-design/src/components/icon';

/**
 * 【注意】：
 *
 * 1. iconfont 图标未生效时，检查 `Icon.scss` 中使用的默认地址是否陈旧；
 * 2. 若是，变更该链接（紧急情况下：可在项目引入本组件库的地方，使用最新的链接地址来覆盖默认配置）；
 * 3. 若不是，检查使用方式是否不对。
 *
 * 更多配置，请查看 [view-design icon](https://www.iviewui.com/components/icon#API)
 */
@Component({
  components: {
    Icon,
  },
})
export default class SzIcon extends BaseUI {
  /**
   * 是否使用 view-design 的 icon 图标
   */
  @Prop({ default: false, type: Boolean }) private viewicon!: boolean;

  /**
   * 图标的类型：
   *
   * 1. iconfont “PC端通用组件”项目中所示图标名（Font class类型），其对应的字体为 `font-family: 'sz-iconfont';`
   * 2. iview icon 图标类型（当且仅当 `viewicon` 为 `true` 时有效）
   */
  @Prop() private type!: string;

  /**
   * 自定义图标
   *
   * 【注意】：自定义图标时，样式中不含 `.sz-iconfont`，但仍然包含 `.ivu-icon`
   */
  @Prop() private custom!: string;

  public preName = Object.freeze('icon');

  /**
   * view-design 的 icon 图标所支持的图标属性
   */
  private get viewiconProps() {
    const { viewicon, type, custom } = this;
    const restProps = this.$attrs;
    // 支持 view-design 的 icon 图标；
    if (viewicon) {
      return { type, ...restProps };
    } else {
      if (custom) {
        // 支持自定义的图标
        return { custom, ...restProps };
      } else {
        // 支持本组件库 iconfont 图标
        return {
          ...restProps,
          custom: `${uiPre}iconfont ${type}`,
        };
      }
    }
  }
}
</script>
