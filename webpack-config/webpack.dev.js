const webpackCommonConfig = require('./webpack.common')
const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  //dev环境开启代码代码同步行数
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      // 直接引入图片 url
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        use: ['style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss
      },
      {
        test: /\.scss$/,
        // 增加 'less-loader' ，注意顺序
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            // 这行的意思是引入加载器 sass-resources-loader
            loader: 'sass-resources-loader',
            options: {
              // 这里是写全局 sass 文件路径
              resources: [path.resolve(__dirname, '../src/style/global.scss')]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 8080,
    hot: true,
    compress: true
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    // 'react-router-dom': 'ReactRouterDOM',
    // antd: 'antd',
    // redux: 'Redux'
  }
})
