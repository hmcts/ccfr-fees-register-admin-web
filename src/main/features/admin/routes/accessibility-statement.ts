import * as express from 'express'

import { Paths } from 'admin/paths'

export default express.Router()
.get(Paths.accessibilityPage.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.accessibilityPage.associatedView, {})
})
