const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        //node_modules内的依赖库
        vendor: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100
        }
      }
    }
  },
  module: {
    rules: [
      // css loader
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        // include: path.join(__dirname, '/node_modules/antd'),
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // 图片loader
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      // 字体loader，my-font.woff，此处没有引入字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.mp3$/,
        use: [
          'url-loader'
        ]
      },
      // es6 react
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'react seed',
      filename: 'index.html',
      template: 'public/index.html'
    })
  ]
};