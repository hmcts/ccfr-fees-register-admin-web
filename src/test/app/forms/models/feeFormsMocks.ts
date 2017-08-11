import * as mock from 'mock-require'

mock('fees/feesClient', {
  'default': {
    checkFeeExists: (code) => Promise.resolve(code === 'existing')
  }
})
