const settings = require('./settings')

module.exports = env => {
  return require(`./webpack.config.${settings.getNodeEnv()}.js`)
}
