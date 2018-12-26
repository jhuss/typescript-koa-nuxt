const settings = require('../../settings')
const appSettings = settings.getSettings()

const nuxtConfig = {
  server: {
    port: appSettings.server.port,
    host: appSettings.server.hostname,
  },
  env: {
    baseUrl: appSettings.server.baseUrl
  },
  dev: true,
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
  },
  srcDir: 'src/client'
}

if (settings.isProdEnv()) {
  nuxtConfig.build = {
    publicPath: 'public'
  }
  nuxtConfig.dev = false
}

module.exports = nuxtConfig
