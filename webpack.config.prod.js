const path = require('path')
const config = require('./webpack.config.base.js')

config.mode = 'production'
config.entry = {
  server: ['./src/server/start/prod.ts']
}
config.output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  filename: '[name].js'
}

module.exports = config
