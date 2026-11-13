import * as nunjucks from 'nunjucks'
import { expect } from 'chai'
import * as path from 'path'

describe('submitButton', () => {

  before(() => {
    const env = nunjucks.configure(path.join(__dirname, '../../../../'), {
      autoescape: true
    })
    env.addGlobal('t', (key: string): string => key)
  })

  it('should produce submit button with provided label', () => {
    const label = 'Save and Continue'
    const submitTag = '<button id="submit" type="submit" class="govuk-button" data-module="govuk-button">' + label + '</button>'
    let res = nunjucks.render('test/resources/submitButton.njk', {
      label: label
    })
    expect(res).to.contain(submitTag)
  })

  it('should produce submit button with default label', () => {
    const defaultTag = '<button id="submit" type="submit" class="govuk-button" data-module="govuk-button">Continue</button>'
    let res = nunjucks.render('test/resources/submitButton.njk', {})
    expect(res).to.contain(defaultTag)
  })

})
