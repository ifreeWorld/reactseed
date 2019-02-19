const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const base = require('./webpack.base.conf.js')

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist'],
      {
        root: path.join(__dirname, './'),
        verbose: true,
        dry: false
      }
    ),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: 'vendor.[hash].css' // 和webpack.base.conf.js中的vendor名字一致
    })
  ],
  module: {
    rules: [
      // 不包括antd的css编译
      {
        test: /\.css$/,
        exclude: /node_modules|antd\.css/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
})
