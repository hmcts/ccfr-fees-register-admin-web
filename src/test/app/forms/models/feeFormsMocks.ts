import * as mock from 'mock-require'

mock('fees/feesClient', {
  'FeesClient': {
    checkFeeExists: (code) => Promise.resolve(code === 'existing')
  }
})
