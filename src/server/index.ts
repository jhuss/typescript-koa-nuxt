const path = require('path')
const fs = require('fs')

const Http2 = require('http2')
const Koa = require('koa')
const statics = require('koa-static')
const {Nuxt, Builder, Generator} = require('nuxt')
const Consola = require('consola')
import {getSettings} from 'root~/settings'

const app = new Koa()
const appSettings = getSettings()

function loadCertFiles() {
  const keyFile = fs.readFileSync(path.resolve(appSettings.server.ssl.key))
  const certFile = fs.readFileSync(path.resolve(appSettings.server.ssl.cert))

  return {key: keyFile, cert: certFile}
}

const htt2Options = (() => {try {return loadCertFiles()} catch (e) {
  Consola.error('Error reading key/cert files for http2')
  Consola.warn(`create ssl cert
  * $ openssl genrsa -des3 -passout pass:<PASSWORD> -out server.pass.key 2048
  * $ openssl rsa -passin pass:<PASSWORD> -in server.pass.key -out server.key
  * $ rm server.pass.key
  * $ openssl req -new -key server.key -out server.csr
  * $ openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
  `)
  process.exit(1)
}})()

export {Http2, htt2Options, Koa, statics, Nuxt, Builder, Generator, Consola}
export {app, appSettings}
export {router} from '~/server/routes'
