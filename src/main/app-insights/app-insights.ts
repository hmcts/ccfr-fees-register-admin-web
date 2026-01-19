import * as config from 'config'
import * as appInsights from 'applicationinsights'

function fineGrainedSampling (envelope: appInsights.Contracts.EnvelopeTelemetry): boolean {
  if (
    ['RequestData', 'RemoteDependencyData'].includes(envelope.data.baseType) &&
    envelope.data.baseData.name.includes('/health')
  ) {
    envelope.sampleRate = 1
  }

  return true
}

export class AppInsights {
  static enable () {
    appInsights.setup(config.get<string>('appInsights.instrumentationKey'))
      .setAutoDependencyCorrelation(true)
      .setAutoCollectConsole(true, true)
    appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = config.get<string>('appInsights.roleName')
    appInsights.defaultClient.addTelemetryProcessor(fineGrainedSampling)

    appInsights.start()
  }
}
