import {Http2, htt2Options, Consola, port, host, app, statics, router} from '~/server/index'
const path = require('path')

let config: any = require('~/client/nuxt.config')
config.dev = false

async function startProd() {
  app.use(async (ctx, next) => {
    await next()
  })
  app.use(router.routes())

  // load nuxt generated
  app.use(statics(path.resolve('dist')))

  Http2
    .createSecureServer(htt2Options, app.callback())
    .listen(port, host, (err) => {
      if (err) {
        throw new Error(err)
      }

      Consola.ready({
        message: `Server listening on https://${host}:${port}`,
        badge: true
      })
    })
}

startProd()
