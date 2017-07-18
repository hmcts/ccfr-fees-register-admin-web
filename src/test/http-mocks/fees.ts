import * as config from 'config'
import * as mock from 'nock'
import * as HttpStatus from 'http-status-codes'

const serviceBaseURL: string = config.get<string>('fees.url')

export function resolveGetCategories () {
  mock(`${serviceBaseURL}/fees-register`)
    .get(new RegExp(`/categories`))
    .reply(HttpStatus.OK, [
      {
        'id': 'onlinefees',
        'ranges': [
          {
            'start': 1,
            'upto': 30000,
            'fee': {
              'type': 'fixed',
              'id': 'X0024',
              'description': 'Civil Court fees - Money Claims Online - Claim Amount - 0.01 upto 300 GBP',
              'amount': 2500
            }
          },
          {
            'start': 30001,
            'upto': 50000,
            'fee': {
              'type': 'fixed',
              'id': 'X0025',
              'description': 'Civil Court fees - Money Claims Online - Claim Amount - 300.01 upto 500 GBP',
              'amount': 3500
            }
          }
        ]
      },
      {
        'id': 'hearingfees',
        'ranges': [
          {
            'start': 1,
            'upto': 30000,
            'fee': {
              'type': 'fixed',
              'id': 'X0048',
              'description': 'Civil Court fees - Hearing fees - Claim Amount - 0.01 upto 300 GBP',
              'amount': 2500
            }
          },
          {
            'start': 30001,
            'upto': 50000,
            'fee': {
              'type': 'fixed',
              'id': 'X0049',
              'description': 'Civil Court fees - Hearing fees - Claim Amount - 300.01 upto 500 GBP',
              'amount': 5500
            }
          }
        ],
        'flatFees': [
          {
            'type': 'fixed',
            'id': 'X0046',
            'description': 'Civil Court fees - Hearing fees - Multi track claim',
            'amount': 109000
          },
          {
            'type': 'fixed',
            'id': 'X0047',
            'description': 'Civil Court fees - Hearing fees - Fast track claim',
            'amount': 54500
          }
        ]
      }
    ])
}

export function resolveGetCategory () {
  mock(`${serviceBaseURL}/fees-register`)
    .get(new RegExp(`/categories/hearingfees`))
    .reply(HttpStatus.OK, {
      'id': 'hearingfees',
      'ranges': [
        {
          'start': 1,
          'upto': 30000,
          'fee': {
            'type': 'fixed',
            'id': 'X0048',
            'description': 'Civil Court fees - Hearing fees - Claim Amount - 0.01 upto 300 GBP',
            'amount': 2500
          }
        },
        {
          'start': 30001,
          'upto': 50000,
          'fee': {
            'type': 'fixed',
            'id': 'X0049',
            'description': 'Civil Court fees - Hearing fees - Claim Amount - 300.01 upto 500 GBP',
            'amount': 5500
          }
        }
      ],
      'flatFees': [
        {
          'type': 'fixed',
          'id': 'X0046',
          'description': 'Civil Court fees - Hearing fees - Multi track claim',
          'amount': 109000
        },
        {
          'type': 'fixed',
          'id': 'X0047',
          'description': 'Civil Court fees - Hearing fees - Fast track claim',
          'amount': 54500
        }
      ]
    })
}
