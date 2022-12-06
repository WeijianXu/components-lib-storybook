import { Vue, Component, Prop } from 'vue-property-decorator';
import { RawLocation } from 'vue-router';

/**
 * 组件通用混入模式
 * 1. 提供组件前缀混入
 */
@Component
export default class BaseLink extends Vue {
  /**
   * 跳转的链接，支持 vue-router 对象
   */
  @Prop() public to!: RawLocation;

  /**
   * 路由跳转时，开启 replace 将不会向 history 添加新记录
   */
  @Prop({ default: false, type: Boolean }) public replace!: boolean;

  /**
   * 相当于 a 链接的 target 属性
   */
  @Prop({ default: '_self' }) public target!: string;

  /**
   * 同 vue-router append
   */
  @Prop({ default: false, type: Boolean }) public append!: boolean;

  /**
   * 根据 `to` 属性得出链接地址，字符串形式
   */
  public get linkUrl(): string {
    if (typeof this.to === 'string' && this.to.includes('//')) {
      return this.to;
    }
    const router = this.$router;
    if (router) {
      const current = this.$route;
      const route = router.resolve(this.to, current, this.append);
      // 是 route 对象
      if (route) {
        return route.href;
      }
    }
    // 不是 route 对象，也不是绝对路径
    if (typeof this.to === 'string') {
      return this.to;
    }
    return '';
  }

  public handleClick(new_window = false) {
    if (!this.to || !this.linkUrl) {
      return;
    }

    if (new_window) {
      window.open(this.linkUrl);
    } else {
      const router = this.$router;
      if (router) {
        if (typeof this.to === 'string' && this.to.includes('//')) {
          window.location.href = this.to;
        } else {
          // 支持 vue-router 对象
          this.replace
            ? this.$router.replace(this.to, () => {})
            : this.$router.push(this.to, () => {});
        }
      } else {
        window.location.href = this.linkUrl;
      }
    }
  }
}
