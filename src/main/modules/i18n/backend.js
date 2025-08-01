"use strict";

const {readFile} = require('fs');
const {po2i18next} = require('gettext-converter'); // replace i18next-conv

/**
 A gettext backend for i18next framework
 */
class Backend {

  static defaultsOptions() {
    return { loadPath: '/locales/{{lng}}/{{ns}}.po' };
  }

  constructor(services, options = {}) {
    this.init(services, options);
  }

  init(services, options = {}, coreOptions = {}) {
    this.services = services;
    this.options = Object.assign({}, Backend.defaultsOptions(), options);
    this.coreOptions = coreOptions;
  }

  /**
   * Reads translations from a PO file and converts them to i18next format.
   * @param {string} language - The language code (e.g., 'en', 'cy').
   * @param {string} namespace - The namespace for the translations.
   * @param {function} callback - Callback function to handle the result.
   */
  read(language, namespace, callback) {
    const translationFile = this.options.loadPath.replace(/{{lng}}/, language).replace(/{{ns}}/, namespace);

    readFile(translationFile, function (err, data) {
      if (err) {
        return callback(err, null);
      }

      try {
        const result = po2i18next(data, { compatibilityJSON: 'v4' });
        callback(null, result); // returns { translation: { ... } }
      } catch (parseError) {
        callback(parseError, null);
      }
    });
  }
}

Backend.type = "backend";

module.exports = Backend;
