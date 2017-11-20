import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'
import { ChannelTypeDto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
  .get(Paths.channelListPage.uri, (req: express.Request, res: express.Response) => {

    FeesClient
      .retrieveChannels()
      .then((channels: Array<ChannelTypeDto>) => {

        res.render(Paths.channelListPage.associatedView, {
          channels: channels
        })
      })
  })
