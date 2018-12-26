import {Http2, htt2Options, Consola, app, appSettings, statics, router} from '~/server/index'
const path = require('path')

async function startProd() {
  app.use(async (ctx, next) => {
    await next()
  })
  app.use(router.routes())

  // load nuxt generated
  app.use(statics(path.resolve('dist')))

  Http2
    .createSecureServer(htt2Options, app.callback())
    .listen(appSettings.server.port, appSettings.server.hostname, (err) => {
      if (err) {
        throw new Error(err)
      }

      Consola.ready({
        message: `Server listening on https://${appSettings.server.hostname}:${appSettings.server.port}`,
        badge: true
      })
    })
}

startProd()
