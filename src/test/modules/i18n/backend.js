"use strict";
/* global describe, it, beforeEach */

const path = require('path');

const chai = require('chai');
const expect = chai.expect;

const spies = require('chai-spies');

const { readFileSync } = require('fs');
const { po2i18next } = require('gettext-converter');

chai.use(spies);

const Backend = require('../../../main/modules/i18n/backend');

describe("A gettext backend for i18next", function () {
  let backend;

  beforeEach(function () {
      backend = new Backend()
    }
  );

  it("should read all translations from PO file", function (done) {
    backend.init(null, {
      loadPath: path.join(__dirname, 'fixtures/translation.po')
    });

    backend.read("cy", "translation", function (err, result) {
      expect(err).to.be.null;
      console.log('The result is: ' + JSON.stringify(result));
      expect(result).to.be.an("object");
      expect(result).to.contain.all.keys({ "Good morning": "Bore da" });
      done();
    })
  });

  it("should fail with an error when file does not exist", function (done) {
    backend.init(null, {
      loadPath: '/tmp/non-existing-file'
    });

    backend.read('cy', 'translation', function (err, translation) {
      expect(err).to.be.an("error");
      expect(translation).to.be.null;
      done()
    })
  })

  it("should fail with a parse error when PO file is malformed", function (done) {
    backend.init(null, {
      loadPath: path.join(__dirname, 'fixtures/bad.po')
    });

    backend.read('cy', 'translation', function (err, translation) {
      expect(err.name).to.equal("SyntaxError");
      expect(translation).to.be.null;
      done();
    });
  });
});

describe('po2i18next', () => {
  it('should convert a valid .po file to i18next format', () => {
    const poPath = path.join(__dirname, 'fixtures/translation.po');
    const poContent = readFileSync(poPath, 'utf8');

    const result = po2i18next(poContent, { compatibilityJSON: 'v4' });

    // result is already a JS object in v4, no need to parse
    expect(result).to.be.an('object');
    expect(result).to.have.property('Good morning', 'Bore da');
  });

  it('should throw an error for an invalid .po file', () => {
    const poPath = path.join(__dirname, 'fixtures/bad.po');
    const poContent = readFileSync(poPath, 'utf8');

    try {
      po2i18next(poContent, { compatibilityJSON: 'v4' });
      // If no error is thrown, fail the test
      expect.fail('Expected SyntaxError to be thrown');
    } catch (err) {
      expect(err).to.be.instanceOf(SyntaxError);
    }
  });
});
