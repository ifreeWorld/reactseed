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
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
