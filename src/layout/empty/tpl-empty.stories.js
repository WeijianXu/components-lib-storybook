// import Vue, { VueConstructor } from 'vue';
import TplEmpty from './index.vue';

// 引入本组件库定义的样式，使 iview 组件和本组件库的组件样式生效
import '@/style.ts';

// 引入本示例 stories 样式文件
import './tpl-empty.stories.scss';

export default {
  title: 'Template/TplEmpty 空页面模板',
  component: TplEmpty,
  argTypes: {
    bgColor: { control: { type: 'color' } },
    bgUrl: { control: { type: 'file' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TplEmpty },
  template: `
    <TplEmpty v-bind="$props" class="story-tpl-empty-page">
      <div>page body</div>
      <div slot="footer" class="story-tpl-empty-footer">
        copyright
        <span class="story-tpl-empty-copyright">©</span>数字浙江技术运营有限公司
      </div>
    </TplEmpty>
  `,
});

export const Default = Template.bind({});
Default.args = {
  bgColor: '#f7f8fa',
};
