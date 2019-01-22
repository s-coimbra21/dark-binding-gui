const commonConfig = require('./webpack.common.additions');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        use: [
          'css-hot-loader',
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
        ],
      },
    ],
  },
};
