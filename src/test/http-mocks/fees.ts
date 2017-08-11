import * as config from 'config'
import * as mock from 'nock'
import * as HttpStatus from 'http-status-codes'

const serviceBaseURL: string = config.get<string>('fees.url')

export function resolveGetCategories () {
  mock(`${serviceBaseURL}/fees-register`)
    .get(new RegExp(`/categories`))
    .reply(HttpStatus.OK, [
      {
        'code': 'online-fees',
        'rangeGroup': {
          'ranges': [
            {
              'from': 1,
              'to': 30000,
              'fee': {
                'code': 'X0024',
                'type': 'fixed',
                'description': 'Civil Court fees - Money Claims Online - Claim Amount - 0.01 upto 300 GBP',
                'amount': 2500
              }
            },
            {
              'from': 30001,
              'to': 50000,
              'fee': {
                'code': 'X0025',
                'type': 'fixed',
                'description': 'Civil Court fees - Money Claims Online - Claim Amount - 300.01 upto 500 GBP',
                'amount': 3500
              }
            }
          ]
        }
      },
      {
        'code': 'hearing-fees',
        'rangeGroup': {
          'ranges': [
            {
              'from': 1,
              'to': 30000,
              'fee': {
                'code': 'X0048',
                'type': 'fixed',
                'description': 'Civil Court fees - Hearing fees - Claim Amount - 0.01 upto 300 GBP',
                'amount': 2500
              }
            },
            {
              'from': 30001,
              'to': 50000,
              'fee': {
                'code': 'X0049',
                'type': 'fixed',
                'description': 'Civil Court fees - Hearing fees - Claim Amount - 300.01 upto 500 GBP',
                'amount': 5500
              }
            }
          ]
        },
        'fees': [
          {
            'code': 'X0046',
            'type': 'fixed',
            'description': 'Civil Court fees - Hearing fees - Multi track claim',
            'amount': 109000
          },
          {
            'code': 'X0047',
            'type': 'fixed',
            'description': 'Civil Court fees - Hearing fees - Fast track claim',
            'amount': 54500
          }
        ]
      }
    ])
}

export function resolveGetCategory () {
  mock(`${serviceBaseURL}/fees-register`)
    .get(new RegExp(`/categories/2`))
    .reply(HttpStatus.OK, {
      'code': 'hearing-fees',
      'rangeGroup': {
        'ranges': [
          {
            'from': 1,
            'to': 30000,
            'fee': {
              'code': 'X0048',
              'type': 'fixed',
              'description': 'Civil Court fees - Hearing fees - Claim Amount - 0.01 upto 300 GBP',
              'amount': 2500
            }
          },
          {
            'from': 30001,
            'to': 50000,
            'fee': {
              'code': 'X0049',
              'type': 'fixed',
              'description': 'Civil Court fees - Hearing fees - Claim Amount - 300.01 upto 500 GBP',
              'amount': 5500
            }
          }
        ]
      },
      'fees': [
        {
          'code': 'X0046',
          'type': 'fixed',
          'description': 'Civil Court fees - Hearing fees - Multi track claim',
          'amount': 109000
        },
        {
          'code': 'X0047',
          'type': 'fixed',
          'description': 'Civil Court fees - Hearing fees - Fast track claim',
          'amount': 54500
        }
      ]
    })
}

export function resolveGetFee () {
  mock(`${serviceBaseURL}/fees-register`)
    .get(new RegExp(`/fees/X0001`))
    .reply(HttpStatus.OK, {
      'code': 'X0001',
      'type': 'fixed',
      'description': 'Civil Court fees - Hearing fees - Claim Amount - 0.01 upto 300 GBP',
      'amount': 2500
    })
}

export function resolveGetFees () {
  mock(`${serviceBaseURL}/fees-register`)
    .get(new RegExp(`/fees`))
    .reply(HttpStatus.OK, [
      {
        'code': 'X0001',
        'type': 'fixed',
        'description': 'Civil Court fees - Hearing fees - Claim Amount - 0.01 upto 300 GBP',
        'amount': 2500
      },
      {
        'code': 'X0002',
        'type': 'fixed',
        'description': 'Civil Court fees - Hearing fees - Claim Amount - 0.01 upto 300 GBP',
        'amount': 123400
      }
    ])
}
