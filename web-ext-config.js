module.exports = {
  ignoreFiles: [
    'web-ext-config.js',
    'web-ext-artifacts',
    'tests/',
    'cypress/',
    'cypress.config.js',
    'images/',
    'node_modules/',
    'package.json',
    'README.md',
    'package-lock.json',
    'cypress.json',
    'manifests/',
    'scripts',
    'manifest-chrome.json',
    'manifest-firefox.json'
  ],
  build: {
    overwriteDest: true
  }
}
