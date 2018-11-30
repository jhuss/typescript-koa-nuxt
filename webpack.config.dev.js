const path = require('path')
const config = require('./webpack.config.base.js')

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

module.exports = config
