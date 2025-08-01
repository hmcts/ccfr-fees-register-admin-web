"use strict";
/* global describe, it, beforeEach */

const path = require('path');

const chai = require('chai');
const expect = chai.expect;

const spies = require('chai-spies');

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

    backend.read("cy", "translation", function (err, translation) {
      expect(err).to.be.null;
      expect(translation).to.contain.all.keys({"Good morning": "Bore da"});
      done()
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
      expect(err).to.be.an("error");
      expect(translation).to.be.null;
      done();
    });
  });
});
