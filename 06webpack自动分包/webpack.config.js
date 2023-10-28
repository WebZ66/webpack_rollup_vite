const { Configuration } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
/**
 * @type {Configuration} //配置智能提示
 */
module.exports = {
  mode: 'development',
  name: 'main',
  entry: './src/index.js',
  devtool: false,
  output: {
    path: path.resolve(__dirname, './build'),
    //placeholder
    filename: '[name]-bundle.js',
    clean: true,
    //单独针对分包的文件进行命名
    chunkFilename: '[name]_chunk.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react']]
          }
        }
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-typescript',
                {
                  //配置polyfill
                  corejs: 3,
                  useBuiltIns: 'usage'
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {},
  //优化配置
  optimization: {
    splitChunks: {
      //默认只对异步import()导入的进行分包
      // chunks:'async'
      chunks: 'all',
      //自己对需要进行拆包的内容进行分组
      cacheGroups: {
        
      }
    }
  }
}
