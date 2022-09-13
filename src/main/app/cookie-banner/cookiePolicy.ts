import Cookie from 'app/cookie-banner/cookie'
import { Category } from 'app/cookie-banner/category'

export class CookiePolicy {

  static cookieDetails: Cookie[] =
    [
      { name: 'bar-web', cat: Category.SECURITY, purpose: 'Used to secure communications with HMCTS data services', expires: '8 hours' },
      { name: 'rxVisitor', cat: Category.USAGE, purpose: 'Generated user ID for usage tracking (Dynatrace)', expires: '2 years' },
      { name: 'ai_user', cat: Category.USAGE, purpose: 'Generated user ID for usage tracking (Application Insights)', expires: '6 months' },
      { name: '_oauth2_proxy', cat: Category.SECURITY, purpose: 'Used to protect your login session', expires: '4 hours' },
      {
        name: '__auth__',
        cat: Category.SECURITY,
        purpose: 'Information about your current system authorisations', expires: 'When you close your browser'
      },
      {
        name: 'XSRF-TOKEN',
        cat: Category.SECURITY,
        purpose: 'Used to protect your session against cross site scripting attacks', expires: 'When you close your browser'
      },
      { name: 'dtCookie', cat: Category.DYNATRACE, purpose: 'Tracks a visit across multiple request', expires: 'When session ends' },
      {
        name: '_ga',
        cat: Category.GOOGLE,
        purpose: 'Category helps us count how many people visit the service by tracking if you’ve visited before',
        expires: '2 years'
      },
      { name: 'dtLatC', cat: Category.DYNATRACE, purpose: 'Measures server latency for performance monitoring', expires: 'When session ends' },
      {
        name: 'dtPC',
        cat: Category.DYNATRACE,
        purpose: 'dtPC	Required to identify proper endpoints for beacon transmission; includes session ID for correlation',
        expires: 'When session ends'
      },
      { name: '_gat', cat: Category.GOOGLE, purpose: 'Manages the rate at which page view requests are made', expires: '10 minutes' },
      { name: 'dtSa', cat: Category.DYNATRACE, purpose: 'Intermediate store for page-spanning actions', expires: 'When session ends' },
      { name: '__userid__', cat: Category.IDENTIFY, purpose: 'Your user ID', expires: 'When you close your browser' },
      { name: 'rxVisitor', cat: Category.DYNATRACE, purpose: 'Visitor ID to correlate sessions', expires: '1 year' },
      { name: '_gid', cat: Category.GOOGLE, purpose: 'Identifies you to the service', expires: '24 hours' },
      { name: 'rxvt', cat: Category.DYNATRACE, purpose: 'Session timeout', expires: 'When session ends' }
    ];

  static countCookies(category: string): number {
    return this.cookiesByCat(category).length;
  }

  static cookiesByCat(category: string): Cookie[] {
    return this.cookieDetails.filter(c => c.cat === category);
  }


}