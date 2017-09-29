import { RoutablePath } from 'common/router/routablePath'

export class Paths {
  static readonly loginReceiver = new RoutablePath('/admin/receiver', 'n/a')
  static readonly welcomePage = new RoutablePath('/admin/welcome', 'admin/views/welcome')

  static readonly categoryListPage = new RoutablePath('/admin/categories', 'admin/views/category-list')
  static readonly categoryCreatePage = new RoutablePath('/admin/categories/create', 'admin/views/category-create')
  static readonly categoryEditPage = new RoutablePath('/admin/categories/edit/:categoryCode', 'admin/views/category-edit')

  static readonly rangeGroupListPage = new RoutablePath('/admin/range-groups', 'admin/views/range-group-list')
  static readonly rangeGroupEditPage = new RoutablePath('/admin/range-groups/edit/:rangeGroupCode', 'admin/views/range-group-edit')
  static readonly rangeGroupCreatePage = new RoutablePath('/admin/range-groups/create', 'admin/views/range-group-create')
  static readonly rangeGroupPage = new RoutablePath('/admin/ranges-group/:rangeGroupCode', 'admin/views/range-group')

  static readonly allFeesListPage = new RoutablePath('/admin/all-range-groups', 'admin/views/all-range-groups')

  static readonly feeListPage = new RoutablePath('/admin/fees', 'admin/views/fee-list')
  static readonly feeEditPage = new RoutablePath('/admin/fees/edit/:feeCode', 'admin/views/fee-edit')
  static readonly feeCreatePage = new RoutablePath('/admin/fees/create', 'admin/views/fee-create')
  static readonly healthInfoPage = new RoutablePath('/admin/health', 'admin/views/health-info')

  static readonly notFoundPage = new RoutablePath('n/a', 'admin/views/not-found')
}
