/**
 * 公共配置
 */
// const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const pkg = require('../package.json');

const { pathJoin } = require('./utils');

// scss样式编译配置
const scssOption = {
  // sass-loader version >= 8
  sassOptions: {
    // 暂时不支持使用基于缩进的 sass 语法
    indentedSyntax: false,
  },
  // TODO 也可以从一个文件读取，例如 `variables.scss`
  // // sass-loader 版本 = 8，使用 `prependData` 字段
  prependData: '$color: red;',
};

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        // https://vue-loader.vuejs.org/en/configurations/extract-css.html
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // 它会应用到普通的 `.js` `.ts` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ['\\.vue$'],
              happyPackMode: false,
            },
          },
          /* {
            loader: 'babel-loader',
          }, */
        ],
        // exclude: /node_modules/,
        // 确保 JS 的转译应用到 node_modules 的 Vue 单文件组件
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [/* MiniCssExtractPlugin.loader,  */ 'vue-style-loader', 'css-loader'],
        /* use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'vue-style-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          // 在开发环境使用 css-loader
          fallback: 'css-loader',
        }), */
      },
      // 普通的 `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
      {
        test: /\.scss$/,
        /* use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'vue-style-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          // 在开发环境使用 css-loader
          fallback: 'css-loader',
        }), */
        use: [
          // MiniCssExtractPlugin.loader,
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: scssOption,
          },
        ],
      },
      // 处理图片和字体等
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.vue'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': pathJoin('src'),
    },
  },
  // 正式打包，不用包含 vue
  /* externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
    'vue-property-decorator': {
      root: 'vue-property-decorator',
      commonjs: 'vue-property-decorator',
      commonjs2: 'vue-property-decorator',
      amd: 'vue-property-decorator',
    },
  }, */
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
  ],
};
