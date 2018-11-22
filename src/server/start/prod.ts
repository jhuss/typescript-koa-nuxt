import {port, host, app, statics, router, Consola} from '~/server/index'
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

  app.listen(port, host)
  Consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

startProd()
