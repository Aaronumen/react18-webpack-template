const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath, htmlPath } = require('./path')
const svgToMiniDataURI = require('mini-svg-data-uri')
module.exports = {
  entry: { index: path.join(srcPath, 'index.tsx') },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          'cache-loader',
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: 3 } // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
                  }
                ]
              ],
              cacheDirectory: true,
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: { version: 3 } // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
                  }
                ]
              ]
            }
          }
        ],
        include: srcPath,
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name]_[hash][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb （低于8kb都会压缩成 base64）
          }
        }
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        generator: {
          filename: 'icons/[name]_[hash][ext]',
          dataUrl(content) {
            content = content.toString()
            return svgToMiniDataURI(content) // 通过插件提供的编码算法处理文件
          }
        },
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024 // 2kb （低于2kb都会压缩）
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(htmlPath, 'index.html'),
      filename: 'index.html'
    })
    // new CompressionPlugin({
    //     test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
    //     algorithm: 'gzip',
    //     filename: '[path][base].gz',
    //     threshold: 10240,
    //     minRatio: 0.8
    // })
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.css', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}
