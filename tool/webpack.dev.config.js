/**
 * 本地开发配置
 */
const { merge } = require('webpack-merge');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.config.js');

const { pathJoin } = require('./utils');

module.exports = merge(webpackBaseConfig, {
  // tell webpack to extract these source maps and include in our final bundle
  devtool: 'source-map',

  // 正式打包，不用包含 vue
  externals: {
    vue: {
      root: 'vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
    'vue-router': {
      root: 'vue-router',
      commonjs: 'vue-router',
      commonjs2: 'vue-router',
      amd: 'vue-router',
    },
    'vue-property-decorator': {
      root: 'vue-property-decorator',
      commonjs: 'vue-property-decorator',
      commonjs2: 'vue-property-decorator',
      amd: 'vue-property-decorator',
    },
  },
  output: {
    filename: 'sz-design.js',
    path: pathJoin('dist/lib/'),
    publicPath: '/dist/lib/',
    library: 'sz-design',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.mdx$/,
        use: ['babel-loader', '@mdx-js/vue-loader'],
      },
    ],
  },
  plugins: [
    // 请确保引入这个插件！
    ...webpackBaseConfig.plugins,
    /* new MiniCssExtractPlugin({
      // 注意这里使用的是contenthash，否则任意的js改动，打包时都会导致css的文件名也跟着变动。
      filename: pathJoin('dist/css/[name].[contenthash:7].css'),
      chunkFilename: pathJoin('dist/css/[name].[contenthash:7].css'),
      insert: false,
    }), */
    /* new ExtractTextPlugin({
      filename: pathJoin('dist/css/[name].[contenthash:7].css'),
      disable: process.env.NODE_ENV === 'development',
    }), */
  ],
});
