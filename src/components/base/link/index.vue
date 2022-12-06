<template>
  <span
    :class="[`${pre}-wrap`, disabled ? pre + '-disabled-mask' : '', { ellipsis: ellipsis, underline: underline }]"
  >
    <a :class="pre" :disabled="disabled" @click="handleCheckClick" :href="linkUrl" :target="target">
      <span :class="`${pre}-icon-wrapper`">
        <Icon :type="icon" v-show="icon.trim() !== ''"></Icon>
        <slot></slot>
      </span>
    </a>
  </span>
</template>


<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import BaseUI from '@/mixins/BaseUI';
import { oneOf } from '@/utils/assist';
import Icon from '../icon/index.vue';
import LinkMixin from '@/mixins/Link';

@Component({
  components: { Icon },
})
export default class Link extends Mixins(LinkMixin, BaseUI) {
  /*
   * name 用于生成组件样式前缀 `sz-{name}`，与scss中 `$pre` 保持一致
   */
  public preName = Object.freeze('link');

  /**
   * 禁用选项
   */
  @Prop({ default: false, type: Boolean }) private disabled!: boolean;

  /**
   * 图标
   */
  @Prop({ default: '' }) private icon!: string;

  /**
   * 是否截断文本，默认最大宽度 100%，可自行设置包裹该组件容器或该组件宽度，从而使截断生效
   */
  @Prop({ default: false, type: Boolean }) private ellipsis!: boolean;

  /**
   * 是否鼠标悬停时，显示下划线
   */
  @Prop({ default: false, type: Boolean }) private underline!: boolean;

  public handleCheckClick(event: Event) {
    if (this.to) {
      event.preventDefault();
      this.handleClick(this.target === '_blank');
    }
  }
}
</script>
