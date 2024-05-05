const path = require('path')
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const extensionLoader = require('@victal/cypress-extensions-plugin/loader')
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('before:browser:launch', extensionLoader.load({
    source: path.join(__dirname, '..', '..', '..'),
    alias: 'tapas-rss-firefox',
    manifest: 'manifest-firefox.json',
    watch: false,
    validBrowsers: ['firefox']
  }, {
    source: path.join(__dirname, '..', '..', '..'),
    alias: 'tapas-rss-chrome',
    manifest: 'manifest-chrome.json',
    watch: false,
    validBrowsers: ['chrome']
  }))
}
