// eslint-disable-next-line import/no-extraneous-dependencies
const { plugins } = require('acorn');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function getRules() {
  const rules = [
    // ES-Lint on continuous build
    // {
    //   enforce: 'pre',
    //   test: /\.(js|jsx)$/,
    //   loader: 'eslint-loader',
    //   options: { cache: false }
    // },

    // Our Javascript/JSX (bundle into one)
    {
      test: /\.(js|jsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      ],
      exclude: /node_modules/
    },

    // HandleBar Loaders
    {
      test: /\.(hbs)$/,
      use: [
        {
          // loader: 'assemble-hbs-loader'
          loader: 'assemble-webpack-new'
        }
      ]
    },

    // SCSS-CSS extract to seperate file
    {
      test: /\.(css|scss)$/,

      // resolve-url-loader may be chained before sass-loader if necessary
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
    },
    {
      test: /\.(png|jpg|gif|svg)$/i,
      exclude: /node_modules/,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }
      ]
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      ]
    },
    {
      test: /\.(png|jpg|gif|svg)$/i,
      exclude: /node_modules/,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }
      ]
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      ]
    }
  ];

  return rules;
};
