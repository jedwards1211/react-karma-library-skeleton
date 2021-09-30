/* eslint-env node */

const webpackConfig = require('./webpack.config')
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = (config) => {
  config.set({
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      },
    },
    frameworks: ['mocha', 'webpack'],
    files: ['test/configure.js', 'test/index.js'],
    preprocessors: {
      'test/*.js': ['webpack', 'sourcemap'],
    },
    webpack: Object.assign(webpackConfig, {
      devtool: 'inline-source-map',
    }),
    webpackServer: {
      noInfo: true,
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [{ type: 'text' }, { type: 'lcov' }],
    },
  })
}
