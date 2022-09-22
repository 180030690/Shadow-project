/* eslint-disable no-console */
/* eslint-disable global-require */
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const PROJECT_CONFIG = require('./project-config.js');
const smp = new SpeedMeasurePlugin();
module.exports = (env = {}) => {
  // eslint-disable-next-line no-console
  console.log('>>>> env  : ', env);
  const IS_PRODUCTION_MODE = env.prod;
  const IS_ANALYSE_BUILD = env.analyse || false;
  const IS_MOCK_SERVER = !env.prod;
  const IS_ABSOLUTE_API_PATH = env.absoluteApiPath || false;
  const { APP_PUBLIC_PATH } = PROJECT_CONFIG;
  const APP_CSS_BUNDLE_NAME = env.prod ? '[name].bundle.min.css' : '[name].bundle.css';
  const extractCSS = new MiniCssExtractPlugin({
    filename: `${PROJECT_CONFIG.OUTPUT_CSS_FOLDER}/${APP_CSS_BUNDLE_NAME}`
  });
  const WEBPACK_UTILS = require('./webpack-settings/webpack-utils')({
    IS_PRODUCTION_MODE,
    IS_ANALYSE_BUILD,
    IS_MOCK_SERVER,
    IS_ABSOLUTE_API_PATH,
    APP_PUBLIC_PATH
  });
  // Webpack Entries
  const ENTRIES = require('./webpack-settings/webpack.entry')(IS_PRODUCTION_MODE);
  // Webpack rules
  const RULES = require('./webpack-settings/webpack.rules')();

  // Webpack plugins
  const PLUGINS = require('./webpack-settings/webpack.plugins')({
    IS_PRODUCTION_MODE,
    IS_ANALYSE_BUILD,
    IS_ABSOLUTE_API_PATH,
    APP_PUBLIC_PATH,
    extractCSS
  });

  // Webpack Dev-Server
  const devServer = require('./webpack-settings/webpack.dev-server')({
    IS_MOCK_SERVER,
    APP_PUBLIC_PATH
  });

  WEBPACK_UTILS.printDetails();

  const APP_JS_BUNDLE_NAME = env.prod ? '[name].bundle.min.js' : '[name].bundle.js';

  const config = {
    // context: resolve(PROJECT_CONFIG.SOURCE_ROOT_FOLDER),
    entry: ENTRIES,
    mode: env.prod ? 'production' : 'development',
    output: {
      path: resolve(PROJECT_CONFIG.WEB_ROOT),
      filename: `${PROJECT_CONFIG.OUTPUT_JS_FOLDER}/${APP_JS_BUNDLE_NAME}`,
      publicPath: IS_PRODUCTION_MODE ? PROJECT_CONFIG.PUBLIC_BUILD_DEST : '/',
      pathinfo: !IS_PRODUCTION_MODE
    },
    devtool: env.prod ? false : 'inline-source-map',
    module: {
      rules: RULES
    },
    plugins: PLUGINS,
    optimization: {
      minimizer: env.prod ? [new TerserPlugin({}), new CssMinimizerWebpackPlugin()] : []
    },
    resolve: {
      alias: {
        lib: resolve(PROJECT_CONFIG.JS_LIB),
        hbs: resolve(PROJECT_CONFIG.HANDLEBARS_DIR),
        'fe-components': resolve(PROJECT_CONFIG.HBS_FE_COMPONENTS),
        stylesheets: resolve(PROJECT_CONFIG.STYLESHEETS)
      },
      extensions: ['.js', '.jsx', '.scss']
    },
    stats: {
      children: false
    },
    devServer,
    cache: true
  };
  const configWithTimeMeasures = smp.wrap(config);
  configWithTimeMeasures.plugins.push(extractCSS);
  if (env && env.debug) {
    console.log('wepack.config: ', configWithTimeMeasures);
  }
  return configWithTimeMeasures;
};
