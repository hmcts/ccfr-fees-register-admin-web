
import * as express from 'express'

import { Paths } from 'admin/paths'

import { Category } from "app/cookie-banner/category"
import { CookieDetails } from 'app/cookie-banner/cookieDetails'

export default express.Router()
    .get(Paths.cookieDetailsPage.uri, (req: express.Request, res: express.Response) => {
        res.render(Paths.cookieDetailsPage.associatedView,{
            cookiesByCatGoogle: CookieDetails.cookiesByCat(Category.GOOGLE),
            cookiesByCatDynatrace: CookieDetails.cookiesByCat(Category.DYNATRACE), 
            cookiesByCatAuthToken: CookieDetails.cookiesByCat(Category.AUTHTOKEN),
            cookiesByCatFamily: CookieDetails.cookiesByCat(Category.FAMILY),
            cookiesByCatSecure: CookieDetails.cookiesByCat(Category.SECURE),
            cookiesByCatSecure1: CookieDetails.cookiesByCat(Category.SECURE1),
            cookiesByCatMoneyClaim: CookieDetails.cookiesByCat(Category.MONEYCLAIM),
            cookiesByCatBenefit: CookieDetails.cookiesByCat(Category.BENEFIT),
            cookiesByCatBenefit1: CookieDetails.cookiesByCat(Category.BENEFIT1),
            cookiesByCatBenefit2: CookieDetails.cookiesByCat(Category.BENEFIT2),
            cookiesByCatBenefit3: CookieDetails.cookiesByCat(Category.BENEFIT3),
            cookiesByCatMoreService: CookieDetails.cookiesByCat(Category.MORESERVICE),
            SecHeading: CookieDetails.SECHEADING,
            CommonHeading: CookieDetails.COMMONHEADING,
            CookieContent: CookieDetails.COOKIECONTENT,
            ParaContent: CookieDetails.PARACONTENT,
            CookiePara: CookieDetails.COOKIEPARA,
            CommonPara: CookieDetails.COMMONPARA
        })
    })