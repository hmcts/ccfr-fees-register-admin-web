import * as express from 'express'

export interface Config {
  maxAge: number
  pins: string
}

export class HttpPublicKeyPinning {

  constructor (public config: Config) {
    if (!config) {
      throw new Error('HPKP configuration is required')
    }
  }

  enableFor (app: express.Express) {
    // HPKP was removed in helmet 8.x as it is deprecated
    // This functionality is no longer available
    console.warn('HPKP (HTTP Public Key Pinning) is deprecated and removed from helmet 8.x')
  }
}
