import { RoutablePath } from 'common/router/routablePath'

export class Paths {
  static readonly loginReceiver = new RoutablePath('/admin/receiver', 'n/a')
  static readonly welcomePage = new RoutablePath('/admin/welcome', 'admin/views/welcome')

  static readonly categoryListPage = new RoutablePath('/admin/categories', 'admin/views/category-list')
  static readonly categoryViewPage = new RoutablePath('/admin/categories/:categoryCode', 'admin/views/category-view')

  static readonly feeListPage = new RoutablePath('/admin/fees', 'admin/views/fee-list')
  static readonly feeViewPage = new RoutablePath('/admin/fees/:feeCode', 'admin/views/fee-view')
}
