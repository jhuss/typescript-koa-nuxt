const path = require('path')
const fs = require('fs')

const Http2 = require('http2')
const Koa = require('koa')
const statics = require('koa-static')
const {Nuxt, Builder, Generator} = require('nuxt')
const Consola = require('consola')

const app = new Koa()
const port: number = parseInt(process.env.PORT || '8000')
const host = process.env.HOST || 'localhost'

/* http2 - create ssl cert
* $ openssl genrsa -des3 -passout pass:<PASSWORD> -out server.pass.key 2048
* $ openssl rsa -passin pass:<PASSWORD> -in server.pass.key -out server.key
* $ rm server.pass.key
* $ openssl req -new -key server.key -out server.csr
* $ openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
*/
const htt2Options = {
  key: fs.readFileSync(path.resolve('cert', 'server.key')),
  cert: fs.readFileSync(path.resolve( 'cert', 'server.crt'))
}

export {Http2, Koa, statics, Nuxt, Builder, Generator, Consola}
export {htt2Options, app, port, host}
export {router} from '~/server/routes'
