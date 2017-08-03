import { RoutablePath } from 'common/router/routablePath'

export class Paths {
  static readonly loginReceiver = new RoutablePath('/admin/receiver', 'n/a')
  static readonly welcomePage = new RoutablePath('/admin/welcome', 'admin/views/welcome')
  static readonly categoryListPage = new RoutablePath('/admin/categories', 'admin/views/category-list')
  static readonly categoryViewPage = new RoutablePath('/admin/categories/:categoryId', 'admin/views/category-view')
  static readonly feeViewPage = new RoutablePath('/admin/categories/:categoryId/fees/:feeCode', 'admin/views/fee-view')
}
