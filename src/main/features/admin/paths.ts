import { RoutablePath } from 'common/router/routablePath'

export class Paths {
  static readonly welcomePage = new RoutablePath('/admin/welcome', 'admin/views/welcome')
  static readonly categoryListPage = new RoutablePath('/admin/categories', 'admin/views/category-list')
  static readonly categoryViewPage = new RoutablePath('/admin/categories/:categoryId', 'admin/views/category-view')
}
