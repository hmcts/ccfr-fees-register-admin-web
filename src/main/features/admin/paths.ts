import { RoutablePath } from 'common/router/routablePath'

export class Paths {
  static readonly loginReceiver = new RoutablePath('/admin/receiver', 'n/a')
  static readonly welcomePage = new RoutablePath('/admin/welcome', 'admin/views/welcome')

  static readonly categoryListPage = new RoutablePath('/admin/categories', 'admin/views/category-list')
  static readonly categoryViewPage = new RoutablePath('/admin/categories/:categoryCode', 'admin/views/category-view')

  static readonly rangeGroupListPage = new RoutablePath('/admin/range-groups', 'admin/views/range-group-list')
  static readonly rangeGroupEditPage = new RoutablePath('/admin/range-groups/edit/:rangeGroupCode', 'admin/views/range-group-edit')
  static readonly rangeGroupCreatePage = new RoutablePath('/admin/range-groups/create', 'admin/views/range-group-create')

  static readonly feeListPage = new RoutablePath('/admin/fees', 'admin/views/fee-list')
  static readonly feeEditPage = new RoutablePath('/admin/fees/edit/:feeCode', 'admin/views/fee-edit')
  static readonly feeCreatePage = new RoutablePath('/admin/fees/create', 'admin/views/fee-create')
}
