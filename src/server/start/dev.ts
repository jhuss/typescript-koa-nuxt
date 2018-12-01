import {Http2, htt2Options, Consola, Nuxt, Builder, Generator, port, host, app, statics, router} from '~/server/index'
const path = require('path')

let config: any = require('~/client/nuxt.config')
config.dev = true

async function startDev() {
  app.use(async (ctx, next) => {
    await next()
  })
  app.use(router.routes())
  app.use(statics(path.resolve('build')))

  // nuxt
  const nuxt = new Nuxt(config)
  const builder = new Builder(nuxt)
  builder.build()

  // if (config.mode === 'spa') {
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

startDev()
