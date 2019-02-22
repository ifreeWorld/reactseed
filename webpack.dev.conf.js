const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.conf.js')
const config = require('./config/dev.env.js')

const webpackConfig = merge(base, {
  mode: 'development',
  entry: {
    // mock: path.resolve(__dirname, 'mock/index.js'),
    main: path.resolve(__dirname, 'src/main.js')
  },
  // sourcemap
  devtool: 'cheap-module-eval-source-map',
  // 模块热替换
  devServer: {
    contentBase: '/',
    publicPath: '/',
    host: 'localhost',
    port: 9000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://www.easy-mock.com/mock/5c6f5ee7f5c55f016b1d7652/market', // 外网easymock
        // target: 'http://mock.bbfe.group/mock/5c6f62d72414ac6f106f9941/market', // 内网easymock
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  },
  resolve: {
    // 别名
    alias: {}
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: 'development',
        BASE_URL: 'http://localhost:9000/api'
      })
    })
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
})

// 增加mockjs配置
if (config.mock) {
  webpackConfig.entry.mock = path.resolve(__dirname, 'mock/index.js')
}
module.exports = webpackConfig
