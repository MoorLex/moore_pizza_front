'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const HOST = 'localhost'
const PORT = 8080

module.exports = merge(baseConfig, {
  mode: 'development',

  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    contentBase: '/dist',
    compress: true,
    host: HOST,
    port: PORT,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
