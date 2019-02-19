const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.conf.js');

module.exports = merge(base, {
  mode: 'development',
  // sourcemap
  devtool: 'source-map',
  // 模块热替换
  devServer: {
    contentBase: '/',
    host: 'localhost',
    port: 9000,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      // 不包括antd的css编译
      {
        test: /\.css$/,
        exclude: /node_modules|antd\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // css modules的开关
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss'
            }
          }
        ]
      },
      // 包括antd的css编译
      {
        test: /\.css$/,
        include: /node_modules|antd\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss'
            }
          }
        ]
      }
    ]
  }
});
