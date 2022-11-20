const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./path')
const WebpackBar = require('webpackbar')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
module.exports = merge(webpackCommonConf, {
  mode: 'production',
  // devtool: 'nosources-source-map',
  output: {
    filename: '[name][contenthash].js', // 打包代码时，加上 hash 戳
    chunkFilename: '[name][contenthash].js',
    path: distPath,
    hashDigestLength: 5,
    clean: true
    // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        use: [MiniCssExtractPlugin.loader, 'css-loader'] // 加了 postcss
      },
      {
        test: /\.scss$/,
        // 增加 'less-loader' ，注意顺序
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
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
  plugins: [
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('production')
    }),
    // 抽离 css 文件
    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash].css',
      chunkFilename: '[name][contenthash].css'
    }),
    //不需要webpack打包的静态资源直接复制到dist目录
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: './',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html*']
          }
        }
      ]
    }),
    new WebpackBar({
      color: '#85d', // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false // 默认false，启用探查器。
    })
  ],
  optimization: {
    minimize: true, // 可省略，默认最优配置：生产环境，压缩 true。开发环境，不压缩 false
    minimizer: [
      new TerserPlugin({
        parallel: true, // 可省略，默认开启并行
        terserOptions: {
          toplevel: true, // 最高级别，删除无用代码
          ie8: true,
          safari10: true
        }
      }),
      new CssMinimizerPlugin()
    ],
    // 分割代码块
    splitChunks: {
      chunks: 'all',
      /**
             * initial 入口 chunk，对于异步导入的文件不处理
             async 异步 chunk，只对异步导入的文件处理
             all 全部 chunk
             */

      // 缓存分组
      cacheGroups: {
        antd: {
          name: 'antd', // chunk 名称
          priority: 5, // 权限更高，优先抽离，重要！！！
          test: /(\/|\\)(node_modules)(\/|\\)(antd)(\/|\\)/,
          minSize: 0, // 大小限制
          minChunks: 1 // 最少复用过几次
        },
        react: {
          name: 'react', // chunk 名称
          priority: 4, // 权限更高，优先抽离，重要！！！
          test: /[\\/]node_modules[\\/](react|react-dom)/,
          minSize: 0, // 大小限制
          minChunks: 1 // 最少复用过几次
        },
        // 第三方模块
        vendor: {
          name: 'vendor', // chunk 名称
          priority: 1, // 权限更高，优先抽离，重要！！！
          test: /node_modules/,
          minSize: 0, // 大小限制
          minChunks: 1 // 最少复用过几次
        },
        // 公共的模块
        common: {
          name: 'common', // chunk 名称
          priority: 0, // 优先级
          minSize: 0, // 公共模块的大小限制
          minChunks: 2 // 公共模块最少复用过几次
        }
      }
    }
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    // 'react-router-dom': 'ReactRouterDOM',
    // antd: 'antd',
    // redux: 'Redux'
  }
})
