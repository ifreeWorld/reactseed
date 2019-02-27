const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const base = require('./webpack.base.conf.js')
const config = require('./config/prod.env.js')

const webpackConfig = merge(base, {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, 'src/main.js')
  },
  devtool: 'source-map',
  optimization: {
    nodeEnv: 'production',
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: 'development',
        BASE_URL: 'http://www.freeworldl.club/market'
      })
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, './'),
      verbose: true,
      dry: false
    }),
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

// 增加BundleAnalyzerPlugin配置
if (config.bundleAnalyzer) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin()) // webpack bundle分析工具
}
module.exports = webpackConfig
