/**
 * 链接基础参数
 */
export const linkArgs = {
  to: {
    name: 'to',
    description: '跳转链接，不传则没有链接，支持 vue-router 对象：String | Object',
    type: {
      required: false,
    },
    control: { type: 'text' },
    table: {
      category: 'props',
    },
  },
  replace: {
    name: 'replace',
    description: '路由跳转时，开启 replace 将不会向 history 添加新记录：Boolean',
    type: {
      required: false,
    },
    control: { type: 'boolean' },
    table: {
      category: 'props',
      defaultValue: {
        summary: 'false',
      },
    },
  },
  target: {
    name: 'target',
    description: '相当于 a 链接的 target 属性 对象：String',
    type: {
      required: false,
    },
    control: { type: 'select', options: ['_self', '_blank', '_parent', '_top'] },
    table: {
      category: 'props',
      defaultValue: {
        summary: '_self',
      },
    },
  },
  append: {
    name: 'append',
    description: '同 vue-router append：Boolean',
    type: {
      required: false,
    },
    control: { type: 'boolean' },
    table: {
      category: 'props',
      defaultValue: {
        summary: 'false',
      },
    },
  },
};
