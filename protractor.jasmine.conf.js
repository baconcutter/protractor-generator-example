'use strict';

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
  baseUrl: 'http://localhost:3000',

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['--disable-extensions', '--start-maximized']
    }
  },

  specs: ['test/component-tests/**/*.spec.js'],
  framework: 'jasmine',
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 3000000
  },

  onPrepare: function() {
    require('jasmine-co').install();

    global.EC = protractor.ExpectedConditions;

    // The require statement must be down here, since jasmine-reporters@1.0
    // expects jasmine to be in the global and protractor does not guarantee
    // this until inside the onPrepare function.
    let reporters = require('jasmine-reporters');
    let HtmlScreenshotReporter = require('protractor-html-screenshot-reporter');
    let SpecReporter = require('jasmine-spec-reporter');

    // returning the promise makes protractor wait for the reporter config before executing tests
    return browser.getProcessedConfig()
      .then(function(config) {
        // you could use other properties here if you want, such as platform and version
        var browserName = config.capabilities.browserName;

        var env = jasmine.getEnv();

        env.addReporter(new SpecReporter({displayStackTrace: 'all'}));

        env.addReporter(new HtmlScreenshotReporter({
          baseDirectory: '.tmp/reports/component-tests/' + browserName,
          takeScreenShotsOnlyForFailedSpecs: true
        }));

        env.addReporter(new reporters.JUnitXmlReporter({
          savePath: '.tmp/reports/component-tests',
          consolidate: true,
          useDotNotation: true,
          filePrefix: browserName,
          consolidateAll: true
        }));
      });
  }
};
