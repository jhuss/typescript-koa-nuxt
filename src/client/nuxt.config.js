module.exports = {
  server: {
    port: 8000,
    host: 'localhost',
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8000'
  },
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
  },
  srcDir: 'src/client',
  modules: ['~/modules/typescript'],
  build: {
    publicPath: 'public'
  }
}
