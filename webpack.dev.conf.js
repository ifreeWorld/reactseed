const merge = require('webpack-merge');
const base = require('./webpack.base.conf.js');

module.exports = merge(base, {
  // sourcemap
  devtool: 'source-map',
  // 模块热替换
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: 9000,
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});