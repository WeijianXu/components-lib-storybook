// .storybook/main.js

const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: [
    '../docs/**/*.stories.mdx',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    { name: '@storybook/addon-essentials', options: { backgrounds: false } },
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../src/**/*.stories.@(js|jsx|ts|tsx)')], // 找到自己存放stories的文件夹
        },
        loaderOptions: {
          prettierConfig: { printWidth: 200, singleQuote: true },
        },
      },
    },
    '@storybook/addon-a11y',
  ],

  webpackFinal: async (config /* , { configType } */) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    config.module.rules.push({
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      include: path.resolve(__dirname, '../'),
    });

    // 解析 typescript 语法
    /* config.module.rules.push({
      test: /\.ts$/,
      loader: 'ts-loader',
      options: { appendTsSuffixTo: [/\.vue$/] },
    }); */

    // 增加别名
    config.resolve.alias = {
      ...config.resolve.alias,
      vue: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
    };

    // Return the altered config
    return config;
  },
  previewHead: (head) => `
    ${head}
    <style>
      .docs-story {
        background-color: #f7f8fa;
      }
    </style>
  `,
  typescript: {
    check: false,
    checkOptions: {},
  },
};
