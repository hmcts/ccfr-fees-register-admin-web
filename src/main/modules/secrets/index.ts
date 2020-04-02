import * as propertiesVolume from '@hmcts/properties-volume'
import { get, has, set } from 'lodash'
import { IConfig } from 'config'

const setSecret = (config: IConfig, secretPath: string, configPath: string): void => {
  if (has(config,secretPath)) {
    set(config, configPath, get(config, secretPath))
  }
}

export function setup (config: IConfig): void {
  propertiesVolume.addTo(config)
  if (has(config,'secrets.ccpay')) {
    setSecret(config, 'secrets.ccpay.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey')
  }
}
