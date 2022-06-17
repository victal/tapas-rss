const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  video: false,
  defaultCommandTimeout: 7000,
  responseTimeout: 30000,
  pageLoadTimeout: 60000,
  retries: {
    runMode: 2,
    openMode: 0
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents (on, config) {
      return require('./tests/integration/plugins/index.js')(on, config)
    },
    specPattern: 'tests/integration/**/*.spec.js',
    supportFile: false
  }
})
