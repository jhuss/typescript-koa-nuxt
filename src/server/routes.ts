const KoaRouter = require('koa-router')
const router = new KoaRouter()

router.get('/api/*', ctx => {
  ctx.body = 'Hello Koa'
})

export {router}
