const path = require('path')
const nuxtConfig: any = require('~/client/nuxt.config')
import {Http2, htt2Options, Consola, Nuxt, Builder, Generator, app, appSettings, statics, router} from '~/server/index'

async function startDev() {
  app.use(async (ctx, next) => {
    await next()
  })
  app.use(router.routes())
  app.use(statics(path.resolve('build')))

  // nuxt
  const nuxt = new Nuxt(nuxtConfig)
  const builder = new Builder(nuxt)
  builder.build()

  // if (nuxtConfig.mode === 'spa') {
  //   const generator = new Generator(nuxt, builder)
  //   await generator.generate()
  // }

  app.use(async ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    await nuxt.render(ctx.req, ctx.res)
  })

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

startDev()
