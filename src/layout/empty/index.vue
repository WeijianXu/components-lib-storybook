<template>
  <Layout :class="pre" :style="styles">
    <Content :class="`${pre}-page`">
      <Alert v-if="browserAlert" type="warning" show-icon closable :class="`${pre}-alert`">
        浏览器版本提醒
        <span slot="desc">{{ browserAlert }}</span>
      </Alert>
      <!-- @slot 布局主体内容区域 -->
      <slot></slot>
    </Content>
    <Footer v-if="!noFooter" :class="`${pre}-footer`">
      <!-- @slot 页脚区域 -->
      <slot name="footer"></slot>
    </Footer>
  </Layout>
</template>

<script lang="ts">
import { GlobU } from '@/utils';
import { Layout, Content, Alert, Footer, Button } from '@/components';
import { Component, Prop } from 'vue-property-decorator';
import BaseUI from '@/mixins/BaseUI';

@Component({
  components: {
    Layout,
    Content,
    Alert,
    Footer,
    Button,
  },
})
export default class TplEmpty extends BaseUI {
  /**
   * 背景色
   */
  @Prop() private bgColor!: string;

  /**
   * 背景图片地址
   */
  @Prop() private bgUrl!: string;

  /**
   * 是否不含页脚，默认 false
   */
  @Prop({ default: false, type: Boolean }) private noFooter!: boolean;

  public preName = Object.freeze('tpl-empty'); // 和样式文件中的 $pre 保持一致

  private browserAlert = GlobU.getBrowerAlert();

  private get styles() {
    return {
      backgroundColor: this.bgColor,
      backgroundImage: this.bgUrl ? `url(${this.bgUrl})` : null,
    };
  }
}
</script>
