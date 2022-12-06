// import Vue, { VueConstructor } from 'vue';
import Link from './index.vue';
import { linkArgs } from '../../story-const';

// 引入本组件库定义的样式，使 iview 组件和本组件库的组件样式生效
import '@/style.ts';

export default {
  title: 'Base/Link超链接',
  component: Link,
  argTypes: {
    disabled: { control: { type: 'boolean' }, description: '禁用按钮选项' },
    ...linkArgs,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Link },
  template: '<Link v-bind="$props" >文本链接</Link>',
});

export const Default = Template.bind({});

Default.args = {
  // componentName: 'default',
  // type: 'icon',
  to: '/',
};
