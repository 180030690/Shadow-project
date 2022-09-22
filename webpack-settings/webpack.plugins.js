/* eslint-disable import/no-extraneous-dependencies */
const { resolve, join } = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const assembleWebpack = require('assemble-webpack-new');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const PROJECT_CONFIG = require('../project-config.js');

const { HANDLEBARS_DIR, JS_LIB } = PROJECT_CONFIG;

module.exports = function getPlugins(options) {
  let API_BASE_URL = false;

  if (options.IS_ABSOLUTE_API_PATH) {
    API_BASE_URL = JSON.stringify(PROJECT_CONFIG.API_BASE_URL);
  }

  const plugins = [
    new CaseSensitivePathsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('Some Random Version'), // This Returns a String else 'PURE TEXT WITHOUT  quote'
      ASSETS_PUBLIC_PATH: JSON.stringify(`/${options.APP_PUBLIC_PATH}/assets`),
      IS_MOCK_SERVER: options.IS_MOCK_SERVER,
      API_BASE_URL,
      APP_PUBLIC_PATH: JSON.stringify(options.APP_PUBLIC_PATH),
      IS_DEV: !options.IS_PRODUCTION_MODE
    }),

    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),

    new CopyWebpackPlugin({
      patterns: [
        {
          context: './src/assets',
          from: 'images/**/*',
          to: 'images/'
        }
      ]
    }),

    new StylelintPlugin({
      context: './src',
      extensions: ['css', 'scss'],
      files: '**/*.scss',
      configFile: resolve('./.stylelintrc')
    }),

    new ESLintPlugin({
      context: './src',
      extensions: ['js'],
      files: ['**/*.js'],
      overrideConfigFile: resolve('./.eslintrc.json')
    }),

    new assembleWebpack.AttachedPlugin({
      baseLayout: [`${HANDLEBARS_DIR}/layouts/*.hbs`],
      basePages: [`${HANDLEBARS_DIR}/pages/**/*.hbs`],
      partialsLayout: [`${HANDLEBARS_DIR}/fe-components/**/*.hbs`],
      partialsData: [
        `${HANDLEBARS_DIR}/fe-components/**/*.json`,
        `${HANDLEBARS_DIR}/layouts/**/*.json`,
        `${HANDLEBARS_DIR}/pages/**/*.json`,
        `${HANDLEBARS_DIR}/data/**/*.json`
      ],
      helpers: `${JS_LIB}/utils/handlebars-helpers.js`
    })
  ];

  if (options.IS_ANALYSE_BUILD) {
    plugins.push(
      new Visualizer({
        filename: '../build-analysis/statistics.html'
      })
    );
  }

  if (options.IS_PRODUCTION_MODE) {
    plugins.push(
      new FileManagerPlugin({
        events: {
          onStart: {
            delete: [`${PROJECT_CONFIG.BUILD_DEST}/**`]
          },
          onEnd: {
            copy: [
              {
                source: `${PROJECT_CONFIG.WEB_ROOT}/**/*.css`,
                destination: `${PROJECT_CONFIG.BUILD_DEST}/css`
              },
              {
                source: `${PROJECT_CONFIG.WEB_ROOT}/**/*.js`,
                destination: `${PROJECT_CONFIG.BUILD_DEST}/js`
              },
              {
                source: `${PROJECT_CONFIG.WEB_ROOT}/**/*.html`,
                destination: `${PROJECT_CONFIG.BUILD_DEST}`
              },
              {
                source: `${PROJECT_CONFIG.WEB_ROOT}/images/*.*`,
                destination: `${PROJECT_CONFIG.BUILD_DEST}/images`
              }
            ]
          }
        }
      })
    );
  }

  return plugins;
};
