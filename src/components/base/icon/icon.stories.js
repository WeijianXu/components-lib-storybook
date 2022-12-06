// import Vue, { VueConstructor } from 'vue';
import Icon from './index.vue';
import { Toast, Alert } from '@/components';
// import axios from 'axios';

// 引入本组件库定义的样式，使 iview 组件和本组件库的组件样式生效
import '@/style.ts';
import './icon.stories.scss';

export default {
  title: 'Base/Icon',
  component: Icon,
  argTypes: {
    viewicon: {
      control: { type: 'boolean' },
    },
    type: { control: { type: 'text' } },
    size: {
      description: '图标的大小，单位是 px',

      table: {
        type: {},
        defaultValue: {
          summary: '16',
          detail: '默认iconfont图标大小；\n或系统默认字体大小',
        },
      },
      control: { type: 'number' },
    },
    color: {
      description: '图标的颜色',

      table: {
        defaultValue: {
          summary: '系统默认字体颜色',
          // detail: '默认系统字体颜色',
        },
      },
      control: { type: 'color' },
    },
    custom: { control: { type: 'text' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icon },
  template: `<div><Icon v-bind="$props" />图标旁的文字</div>`,
});

export const Default = Template.bind({});
Default.args = {
  viewicon: false,
  type: 'sz-icon-left',
  size: 20,
  color: '#333333',
};

export const IviewIcon = Template.bind({});
IviewIcon.args = {
  viewicon: true,
  type: 'ios-arrow-back',
};

const example = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icon, Alert },
  template: `<div>
              <Alert type="info" :showIcon="true">
                当前默认地址为：{{ iconCssUrl }}
              </Alert>
              <div class="icon-example-wrap">
                <div v-for="item in arr"
                  v-on:click="copy(item)"
                  class="icon-item">
                  <Icon :type='item' style="font-size: 30px;padding:10px 0"/>
                  <div>{{item}}</div>
                </div>
              </div>
            </div>
            `,
  data() {
    return {
      iconCssUrl: 'https://at.alicdn.com/t/font_2517379_blcrwi81yrl.css',
      arr: [],
      //   var elements = document.getElementsByClassName('icon-code-show');
      // Array.prototype.forEach.call(elements, function (element) {
      //     arr.push(element.innerHTML)
      // });
    };
  },
  methods: {
    copy(str) {
      let transfer = document.createElement('input');
      document.body.appendChild(transfer);
      transfer.value = `<Icon type="${str}"></Icon>`; // 这里表示想要复制的内容
      // transfer.focus();
      transfer.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
      }
      // transfer.blur();
      Toast.success('复制成功');
      document.body.removeChild(transfer);
    },
    loadCss() {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject(); // 兼容IE
      }

      requestObj.open('get', this.iconCssUrl, true);
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      requestObj.send();

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response;
            let reg = /(?<=\.).*?(?=\:before)/g;
            let result = obj.match(reg);
            this.arr = result;
          }
        }
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.loadCss();
    });
  },
});
export const Example = example.bind({});
