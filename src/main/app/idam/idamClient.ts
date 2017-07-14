import * as config from 'config'

import request from 'client/request'
import User from 'app/idam/user'

const idamApiUrl = config.get<string>('idam.api.url')

export default class IdamClient {

  static retrieveUserFor (jwt: string): Promise<User> {
    if (jwt === 'bypass') {
      return new Promise((resolve, reject) => { // FIXME: hardcoding until we get IDAM configured
        resolve(new User(
          123,
          'kazys.sketrys@hmcts.net',
          'Kazys',
          'Sketrys',
          ['some-role'],
          'some-group',
          'jwt'
        ))
      })
    }

    return request.get({
      uri: `${idamApiUrl}/details`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }).then((response: any) => {
      return new User(
        response.id,
        response.email,
        response.forename,
        response.surname,
        response.roles,
        response.group,
        jwt
      )
    })
  }
}
