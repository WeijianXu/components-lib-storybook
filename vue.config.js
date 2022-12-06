const path = require('path');

function resolve(dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: './example/main.js',
      // 模板来源
      template: './example/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Example Page'
    }
  },
  assetsDir: 'assets',
  publicPath: './',
  lintOnSave: false,
  // 配置别名
  chainWebpack: (config) => {
    return config;
  },
  configureWebpack: (config) => {
    // 子模块路径别名
    config.resolve.alias = {
      '@': path.resolve('src'),
    };
  },
  css: {
    loaderOptions: {
      sass: {
        sourceMap: false
      },
      less: {
        sourceMap: false,
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve('src/index.scss'), resolve('src/comps.scss')]
    }
  }
};
