const Koa = require('koa')
const statics = require('koa-static')
const {Nuxt, Builder, Generator} = require('nuxt')
const Consola = require('consola')

const app = new Koa()
const port: number = parseInt(process.env.PORT || '8000')
const host = process.env.HOST || 'localhost'

export {Koa, statics, Nuxt, Builder, Generator, Consola}
export {app, port, host}
export {router} from '~/server/routes'
