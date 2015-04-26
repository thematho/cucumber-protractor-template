// A reference configuration file.
exports.config = {
  // ----- What tests to run -----
  //
  // Spec patterns are relative to the location of this config.
  specs: [
    'features/*.feature',
  ],

  // ----- Capabilities to be passed to the webdriver instance ----
  //
  // For a list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  // Additionally, you may specify count, shardTestFiles, and maxInstances.
  // capabilities: {
  //   browserName: 'phantomjs'
  //   browserName: 'chrome'
  // },

  getPageTimeout: 30000,

  baseUrl: 'http://localhost:9000/',

  // A callback function called once protractor is ready and available, and
  // before the specs are executed
  // You can specify a file containing code to run by setting onPrepare to
  // the filename string.
  onPrepare: function() {
    // At this point, global 'protractor' object will be set up, and jasmine
    // will be available. For example, you can add a Jasmine reporter with:
    //     jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(
    //         'outputdir/', true, true));


    // protractor.getInstance().ignoreSynchronization = true;
    browser.get('#/');
  },

  // ----- The test framework -----
  //
  // Jasmine and Cucumber are fully supported as a test and assertion framework.
  // Mocha has limited beta support. You will need to include your own
  // assertion framework if working with mocha.
  framework: 'cucumber',

  // ----- Options to be passed to cucumber -----
  cucumberOpts: {
    // Require files before executing the features.
    // require: 'cucumber/stepDefinitions.js',
    // Only execute the features or scenarios with tags matching @dev.
    // This may be an array of strings to specify multiple tags to include.
    // tags: '@dev',
    // How to format features (default: progress)
    // format: 'summary'
    // format: 'progress'
    format: 'pretty'
  },

  // ----- The cleanup step -----
  //
  // A callback function called once the tests have finished running and
  // the webdriver instance has been shut down. It is passed the exit code
  // (0 if the tests passed or 1 if not).
  onCleanUp: function() {}
};
