export as namespace settings

export const nodeEnvOptions: {
  dev: 'development',
  prod: 'production'
}

export type nodeEnvType = 'dev' | 'prod'

export interface ISettings {
  server: IServer
}

interface IServer {
  hostname: string,
  port: number,
  baseUrl: string,
  ssl: IServerSsl
}

interface IServerSsl {
  key: string,
  cert: string
}

export function getNodeEnv(): nodeEnvType
export function isNodeEnv(): boolean
export function isProdEnv(): boolean
export function getSettings(env?: nodeEnvType): ISettings
export function fixSettings(settings: object): ISettings
