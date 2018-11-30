const path = require('path')
const config = require('./webpack.config.base.js')
const NodemonPlugin = require('nodemon-webpack-plugin')

config.mode = 'development'
config.devtool = 'cheap-module-eval-source-map'
config.entry = {
  dev: [
    './src/server/start/dev.ts'
  ]
}
config.output = {
  path: path.resolve(__dirname, 'build'),
  publicPath: '/',
  filename: '[name].js'
}
config.plugins = [
  new NodemonPlugin({
    watch: path.resolve(__dirname, 'build')
  })
]

module.exports = config
