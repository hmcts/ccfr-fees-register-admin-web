
import Cookie from 'app/cookie-banner/cookie'
import { Category } from 'app/cookie-banner/category'

export class CookieDetails {

  public static readonly COMMONHEADING = 'Cookies used to make the service more secure';
  public static readonly COMMONPARA = `We set cookies which prevent attackers from modifying
    the contents of the other cookies we set. Category makes the service more secure and protects your personal information.`;

  public static readonly PARACONTENT = `Session cookies are stored on your computer as you travel through a website,
    and let the website know what you’ve seen and done so far.\n
    These are temporary cookies and are automatically deleted a short while after you leave the website.`;
  public static readonly SECHEADING = `Cookies used to store the answers you’ve given during your visit (known as a ‘session’)`;
  public static readonly COOKIECONTENT = 'Cookies used to identify you when you come back to the service';
  public static readonly COOKIEPARA = 'We use authentication cookies to identify you when you return to the service.';
  static isCookiePageEnabled = false;

  static cookieDetails: Cookie[] =
    [
      {
        name: '_ga',
        cat: Category.GOOGLE,
        purpose: 'Category helps us count how many people visit the service by tracking if you’ve visited before',
        expires: '2 years'
      },
      { name: '_gat', cat: Category.GOOGLE, purpose: 'Manages the rate at which page view requests are made', expires: '10 minutes' },
      { name: '_gid', cat: Category.GOOGLE, purpose: 'Identifies you to the service', expires: '24 hours' },
      { name: 'dtCookie', cat: Category.DYNATRACE, purpose: 'Tracks a visit across multiple request', expires: 'When session ends' },
      { name: 'dtLatC', cat: Category.DYNATRACE, purpose: 'Measures server latency for performance monitoring', expires: 'When session ends' },
      {
        name: 'dtPC',
        cat: Category.DYNATRACE,
        purpose: 'dtPC	Required to identify proper endpoints for beacon transmission; includes session ID for correlation',
        expires: 'When session ends'
      },
      { name: 'dtSa', cat: Category.DYNATRACE, purpose: 'Intermediate store for page-spanning actions', expires: 'When session ends' },
      { name: 'rxVisitor', cat: Category.DYNATRACE, purpose: 'Visitor ID to correlate sessions', expires: '1 year' },
      { name: 'rxvt', cat: Category.DYNATRACE, purpose: 'Session timeout', expires: 'When session ends' },
      {
        name: 'TSxxxxxxxx', cat: Category.MORESERVICE,
        purpose: 'Protects your session from tampering', expires: 'When you close your browser'
      },
      {
        name: '__state', cat: Category.MORESERVICE,
        purpose: 'Identifies you to the service and secures your authentication', expires: 'When you close your browser'
      },
      {
        name: 'X_CMC', cat: Category.MORESERVICE,
        purpose: 'Helps us keep track of your session', expires: 'When you close your browser'
      },
      { name: 'connect.sid', cat: Category.FAMILY, purpose: 'Carries details of your current session', expires: 'When you close your browser' },
      { name: 'sessionKey', cat: Category.FAMILY, purpose: 'rotects your session using encryption', expires: 'When you close your browser' },
      {
        name: 'state', cat: Category.SECURE,
        purpose: 'Identifies you to the service and secures your authentication', expires: 'When session ends'
      },
      { name: 'ARRAfinnity', cat: Category.SECURE, purpose: 'Protects your session from tampering', expires: 'When session ends' },
      { name: '_csrf', cat: Category.SECURE, purpose: 'Helps protect against forgery', expires: 'When session ends' },
      { name: '__auth-token', cat: Category.AUTHTOKEN, purpose: 'Identifies you to the service', expires: 'When you close your browser' },
      {
        name: 'TS01842b02', cat: Category.SECURE1,
        purpose: 'Protects your session from tampering', expires: 'When you close your browser'
      },
      {
        name: '__state', cat: Category.SECURE1,
        purpose: 'Identifies you to the service and secures your authentication', expires: 'When you close your browser'
      },
      { name: '_csrf', cat: Category.SECURE1, purpose: 'Helps protect against forgery', expires: 'When you close your browser' },
      { name: 'session_ID', cat: Category.MONEYCLAIM, purpose: 'Keeps track of your answers', expires: 'When session ends' },
      { name: 'eligibility-check', cat: Category.MONEYCLAIM, purpose: 'Stores answers to eligibility questions', expires: 'Ten minutes' },

      { name: 'session', cat: Category.BENEFIT, purpose: 'Carries details of your current session', expires: 'When session ends' },
      { name: 'connect.sid', cat: Category.BENEFIT, purpose: 'Carries details of your current session', expires: 'When session ends' },
      { name: 'i18n', cat: Category.BENEFIT, purpose: 'Identifies your preferred language', expires: 'When session ends' },

      {
        name: 'connect.sid', cat: Category.BENEFIT1,
        purpose: 'Carries details of your current session', expires: 'When you close your browser'
      },
      { name: 'session_ID', cat: Category.BENEFIT1, purpose: 'Keeps track of your answers', expires: 'When you close your browser' },

      { name: 'TSxxxxxxxx', cat: Category.BENEFIT2, purpose: 'Protects your session from tampering', expires: 'When you close your browser' },
      {
        name: '__state', cat: Category.BENEFIT2,
        purpose: 'Identifies you to the service and secures your authentication', expires: 'When you close your browser'
      }
    ];

  static cookiesByCat(category: string): Cookie[] {
    return this.cookieDetails.filter(c => c.cat === category);
  }

}