const commonConfig = require('./webpack.common.additions');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const loaders = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 2,
      localIdentName: '[local]--[hash:base64:5]',
    },
  },
  'sass-loader',
];

if (isDev) loaders.unshift('css-hot-loader');

module.exports = {
  ...commonConfig,
  module: {
    rules: [
      {
        test: /\.scss/,
        loader: 'identity-loader',
      },
      {
        test: /\.scss$/,
        use: loaders,
      },
    ],
  },
};
