const fs = require('fs')
const toml = require('toml')
const Consola = require('consola')

const nodeEnvOptions = {
  dev: 'development',
  prod: 'production'
}

function getNodeEnv() {
  const env = process.env['NODE_ENV'];

  if (env && env === nodeEnvOptions.prod) return 'prod'
  return 'dev'
}

function isNodeEnv(env) {
  return Object.keys(nodeEnvOptions).includes(env)
}

function isProdEnv() {
  return getNodeEnv() === 'prod'
}

function getSettings(env) {
  if (!env || !isNodeEnv(env)) {
    env = getNodeEnv()
  }

  const settingsFile = `config/settings.${env}.toml`
  let settings =  null

  try {
    settings = toml.parse(fs.readFileSync(settingsFile, 'utf-8'))
    fixSettings(settings)
  } catch (e) {
    Consola.error(e)
    process.exit(1)
  }

  return settings
}

function fixSettings(settings) {
  // server
  if (!settings.server) settings['server'] = {}
  if (!settings.server.hostname) settings.server['hostname'] = 'localhost'
  if (!settings.server.port) settings.server['port'] = 8000
  if (!settings.server.baseUrl) settings.server['baseUrl'] = `https://${settings.server.hostname}:${settings.server.port}`
  // use envs
  if (process.env.HOSTNAME) settings.server['hostname'] = String(process.env.HOSTNAME)
  if (process.env.PORT) settings.server['port'] = parseInt(process.env.PORT)
  if (process.env.BASE_URL) settings.server['BASE_URL'] = String(process.env.BASE_URL)

  // server.ssl
  if (!settings.server.ssl) settings.server['ssl'] = {}
  if (!settings.server.ssl.key) settings.server.ssl['key'] = 'cert/server.key'
  if (!settings.server.ssl.cert) settings.server.ssl['cert'] = 'cert/server.crt'
  // use envs
  if (process.env.SSL_KEY) settings.server.ssl['key'] = String(process.env.SSL_KEY)
  if (process.env.SSL_CERT) settings.server.ssl['cert'] = String(process.env.SSL_CERT)
}

exports.nodeEnvOptions = nodeEnvOptions
exports.getNodeEnv = getNodeEnv
exports.isNodeEnv = isNodeEnv
exports.isProdEnv = isProdEnv
exports.getSettings = getSettings
exports.fixSettings = fixSettings
