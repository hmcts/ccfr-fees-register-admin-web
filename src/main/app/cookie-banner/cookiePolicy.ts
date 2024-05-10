import Cookie from 'app/cookie-banner/cookie'
import { Category } from 'app/cookie-banner/category'

export class CookiePolicy {

  static cookieDetails: Cookie[] =
    [
      { name: 'fee-register-admin-web-cookie-preferences', cat: Category.SECURITY, purpose: 'Used tostore application preferences', expires: '1 year' },
      { name: '_csrf', cat: Category.SECURITY, purpose: 'Helps protect against forgery', expires: 'When session ends' },
      { name: '__auth-token', cat: Category.SECURITY, purpose: 'Identifies you to the service', expires: 'When you close your browser' },
      { name: 'lang', cat: Category.SECURITY, purpose: 'Identifies application language', expires: '1 year'},
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