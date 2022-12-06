import vue from 'rollup-plugin-vue';
// import bundleScss from 'rollup-plugin-bundle-scss';
import typescript from 'rollup-plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';
import del from 'rollup-plugin-delete';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
// import image from '@rollup/plugin-image';
import smartAsset from 'rollup-plugin-smart-asset';
import styles from 'rollup-plugin-styles';
// import dts from 'rollup-plugin-dts';
// import scss from 'rollup-plugin-scss';

import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

// const glob = require('glob');
const { pathJoin } = require('./utils');
const esEntries = require('./es-entries.json');

const baseExtensions = ['.js', '.jsx', '.ts', '.tsx', '.vue'];

const baseConfig = {
  input: 'src/index.ts',

  external: ['vue', 'vue-property-decorator', 'vue-router', 'axios', 'view-design'],
};

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  vue: 'Vue',
};

const pluginsPreVue = [
  resolve({ browser: true, preferBuiltins: false }), // 插件允许加载第三方模块
  commonjs(), // 插件将它们转换为ES6版本
  json(),
  //  TODO 设置路径别名，在 vue 文件 style 中没有生效
  alias({
    entries: [
      {
        find: '@',
        replacement: pathJoin('src'),
        // OR place `customResolver` here. See explanation below.
      },
    ],
    customResolver: resolve({
      extensions: [...baseExtensions, '.sass', '.scss'],
    }),
  }),
  // 解析默认样式语法
  // css({ output: 'sz-design.css' }),
  /* styles({
    mode: ['extract', 'sz-design.css'],
  }), */
  /* scss({
    prefix: '@import "../src/theme/variants.scss";',
  }), */
  // 解析 typescript 语法
  typescript({
    tsconfig: false,
    experimentalDecorators: true,
    module: 'es2015',
  }),
];

const doVue = {
  css: false,
  template: {
    isProduction: true,
  },
  style: {
    preprocessOptions: {
      scss: {
        includePaths: ['node_modules', 'src'],
        importer: (url) => {
          // console.log('vue scss before', url);
          if (url.includes('theme/variants')) {
            url = pathJoin(`src${url.substr(1)}.scss`);
          }
          // console.log('vue scss after', url);
          return { file: url };
        },
        // data: '@import "@/theme/variants";',
      },
    },
  },
};

const handleAsset = (option = {}) =>
  smartAsset({
    assetsPath: './assets',
    url: 'copy',
    // 处理图片和字体文件
    extensions: ['.svg', '.gif', '.png', '.jpg', '.woff', '.eot', '.ttf'],
    keepImport: true,
    ...option,
  });

const esConfig = {
  ...baseConfig,
  input: esEntries,
  output: {
    format: 'esm',
    // file: 'dist/sz-design.es.js',
    exports: 'named',
    dir: 'dist/es',
    assetFileNames: '[name][extname]',
    /* globals: {
      vue: 'Vue',
    }, */
  },
  external: ['vue'],
  plugins: [
    // 清除上一次编译文件
    // del({ targets: ['dist/sz-design.es.js', 'dist/assets/*'] }),
    del({ targets: ['dist/es/*'] }),
    handleAsset({ assetsPath: '../assets' }),

    ...pluginsPreVue,

    // 解析scss样式语法，output to dist/index.scss
    /* bundleScss({
      // dir: '../styles',
      // file: 'styles',
      // output: 'sz-design.scss',
      // exclusive: false,
      bundlerOptions: {
        // entryFile: '../src/theme/index.scss',
        rootDir: pathJoin('src'),
        outFile: pathJoin('dist/es/sz-design.scss'),
        // ignoreImports: [pathJoin('src/theme/variants.scss')],
        dedupeGlobs: [pathJoin('src/theme/variants.scss')],
        // includePaths: ['node_modules', pathJoin('src')],
        // ignoreImports: ['theme/variants.scss'],
        // logLevel: 'silent',
      },
    }), */
    /* url({
      fileName: '[name]-[hash][extname]',
      destDir: '../assets',
    }), */
    vue({
      ...doVue,
    }),

    // 清除多余空格、空行等
    cleanup(),
  ],
};

// # compile to a CommonJS module ('cjs')
const cjsConfig = {
  ...baseConfig,
  output: {
    // compact: true,
    file: 'dist/sz-design.cjs.js',
    format: 'cjs',
    name: 'sz-design',
    exports: 'named',
    globals,
  },
  plugins: [
    // 清除上一次编译文件
    del({ targets: 'dist/sz-design.cjs.js' }),
    handleAsset(),

    ...pluginsPreVue,
    vue({
      ...doVue,
      template: {
        isProduction: true,
        optimizeSSR: true,
      },
    }),

    // 清除多余空格、空行等
    /* terser({
      mangle: {
        keep_classnames: true,
      },
      keep_classnames: true, // 组件 class 名保留
    }), */
    cleanup(),
  ],
};

// cdn 使用
const unpkgConfig = {
  ...baseConfig,
  output: {
    // compact: true,
    file: 'dist/sz-design.min.js',
    format: 'iife',
    name: 'sz-design',
    exports: 'named',
    extend: true,
    globals,
  },
  plugins: [
    // 清除上一次编译文件
    del({ targets: 'dist/sz-design.min.js' }),
    handleAsset(),

    ...pluginsPreVue,
    vue({
      ...doVue,
    }),

    // 清除多余空格、空行等
    terser({
      ecma: 5,
      keep_classnames: true, // 组件 class 名保留
      keep_fnames: true,
    }),
    cleanup(),
  ],
};

// 处理样式
// const scsssInputs = glob.sync(pathJoin('src/**/*.scss'));
const scssStyles = {
  input: pathJoin('src/style.ts'), // scsssInputs,
  output: {
    format: 'esm',
    // file: 'dist/sz-design',
    exports: 'named',
    dir: 'dist',
    assetFileNames: '[name][extname]',
  },
  plugins: [
    del({ targets: ['dist/style.js', 'dist/sz-design.css'] }),
    /* scss({
      output: 'dist/sz-design.css',
      prefix: '@import "../src/theme/variants.scss";',
    }), */
    styles({
      mode: ['extract', 'assets/sz-design.css'],
      less: { javascriptEnabled: true },
    }),
    cleanup(),
  ],
};
/* const dtsConfig = {
  input: './my-input/index.d.ts',
  output: [{ file: 'dist/my-library.d.ts', format: 'es' }],
  plugins: [dts()],
}; */

export default [esConfig, scssStyles, cjsConfig, unpkgConfig];
