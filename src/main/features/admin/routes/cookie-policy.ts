import * as express from 'express'

import { Paths } from 'admin/paths'

import { CookiePolicy } from 'app/cookie-banner/cookiePolicy'
import { Category } from 'app/cookie-banner/category'

export default express.Router()
.get(Paths.cookiePolicyPage.uri, (req: express.Request, res: express.Response) => {
        
        res.render(Paths.cookiePolicyPage.associatedView, { 
            countCookiesByCatGoogle: CookiePolicy.countCookies(Category.GOOGLE),
            countCookiesByCatDynatrace: CookiePolicy.countCookies(Category.DYNATRACE),
            countCookiesByCatSecurity: CookiePolicy.countCookies(Category.SECURITY),
            cookiesByCatGoogle: CookiePolicy.cookiesByCat(Category.GOOGLE),
            cookiesByCatDynatrace: CookiePolicy.cookiesByCat(Category.DYNATRACE),
            cookiesByCatSecurity: CookiePolicy.cookiesByCat(Category.SECURITY) 
        })
    })