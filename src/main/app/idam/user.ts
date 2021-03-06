export default class User {

  id: number

  email: string

  forename: string

  surname: string

  roles: string[]

  group: string

  bearerToken: string

  constructor (id: number,
               email: string,
               forename: string,
               surname: string,
               roles: string[],
               group: string,
               bearerToken: string) {

    this.id = id

    this.email = email

    this.forename = forename

    this.surname = surname

    this.roles = roles

    this.group = group

    this.bearerToken = bearerToken

  }

  isInRoles (...requiredRoles: string[]): boolean {

    return requiredRoles.every(requiredRole => this.roles.indexOf(requiredRole) > -1)

  }

}
