import * as mock from 'mock-require'
import FeeCategory from 'app/fees/feeCategory'
import FeeRange from 'app/fees/feeRange'
import FlatFee from 'app/fees/flatFee'

function someCategory () {
  return new FeeCategory(
    'onlinefees',
    [new FeeRange(1, 100, new FlatFee('X001', 'fixed', 'Some description', 100, null))],
    [new FlatFee('X002', 'fixed', 'Other description', 200, null)]
  )
}

mock('app/fees/feesClient', {
  'default': {
    retrieveCategory: (categoryId) => Promise.resolve(someCategory()),
    retrieveCategories: () => Promise.resolve([someCategory(), someCategory(), someCategory()])
  }
})
