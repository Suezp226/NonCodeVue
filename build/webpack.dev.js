// 不需要压缩代码
// 需要热更新
// css不需要提取到css文件
// sourceMap

// @intervolga/optimize-cssnano-plugin 用于压缩css代码
// mini-css-extract-plugin 用于提取css到文件中
// clean-webpack-plugin 用于删除上次构建的文件
// webpack-merge 合并 webpack配置
// copy-webpack-plugin 用户拷贝静态资源

const { merge } = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const webpack = require('webpack')
module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool:  'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]
})
