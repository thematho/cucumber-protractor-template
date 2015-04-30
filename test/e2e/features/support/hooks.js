'use strict';

// @Caveats: For older versions of Protractor
// instead of browser use protractor.getInstance()+

var hooks = function() {
  var _ = require('lodash'),
    path = require('path'),
    q = require('q'),
    fs = require('fs'),
    self = this,
    // Dev Mocks  if exist, otherwise remove this implementation
    defaultMocks = require('../../../../app/dev-mocks/mocks-module-plugin.js'),
    // Screen size for E2E Testing
    // TODO: make screen size configurables per task
    defaultScreenWidth = 1024,
    defaultScreenHeight = 768,
    // Resolves all the mocks files
    getE2EMockModules = function() {
      var mockDir = path.resolve(__dirname, '../mocks');
      return fs.readdirSync(mockDir).map(function(mockFile) {
        return require(path.resolve(mockDir, mockFile));
      });
    },
    // Removes sessionStorage & localStorage if is enabled
    cleanStorage = function() {
      return browser.executeScript(function() {
        try {
          if (window.sessionStorage) {
            window.sessionStorage.clear();
          }
          if (window.localStorage) {
            window.localStorage.clear();
          }
        } catch (err) {}
      });
    },
    //Schedules a command to delete all cookies visible to the current page
    cleanCookies = function() {
      return browser.driver.manage()
        .getCookies(function(cookies) {
          if (cookies && cookies.length) {
            return browser.driver.manage().deleteAllCookies();
          }
          return q.when();
        });
    };

  this.Before(function(scenario, next) {
    // console.log('Before hook');
    // console.log(scenario.getName(), "(" + scenario.getUri() + ":" + scenario.getLine() + ")");
    // console.dir(scenario);
    next();
  });

  this.After(function(scenario, next) {
    // console.log('After hook');
    // console.log(scenario.getName(), "(" + scenario.getUri() + ":" + scenario.getLine() + ")");
    // console.dir(scenario);
    next();
  });

  /* Available Handlers */
  // this.registerHandler('BeforeFeatures', handler);
  // this.registerHandler('BeforeFeature', handler);
  // this.registerHandler('BeforeScenario', handler);
  // this.registerHandler('BeforeStep', handler);


  // The function registerHandler supostly is not part of the official API.
  // (see issue:
  //  https://github.com/cucumber/cucumber-js/issues/280#issuecomment-67786109 )
  // But i couldn't find a cleanner way to execute async code
  // on the Before hook, be careful this might change on future updates
  this.registerHandler('BeforeScenario', function(event, done) {
    browser.driver.manage()
      .window().setSize(defaultScreenWidth, defaultScreenHeight)
      // Clean localStorage and sessionStorage
      .then(cleanStorage)
      // Clean Cookies
      .then(cleanCookies)
      //execute the callback
      .then(function() {
        done();
      });
    // done();
  });



  // First Load mocks modules for E2E test
  getE2EMockModules()
    .forEach(function(module) {
      // Register each Module
      _.keys(module).forEach(function(key) {
        // Register using Around
        self.Around('@AroundMock(' + key + ')', function(runScenario) {
          // Add the mock Module before run the Scenario
          browser.addMockModule(key, module[key]);
          runScenario(function(callback) {
            // Remove the mock Module after run the Scenario
            browser.removeMockModule(key);
            callback();
          });
        });
      });
    });

  // Load the Default mocks using during development after all
  // AroundHooks have run so they have less priority.
  // This allow for overriding default mock data using new Around @AroundMock()
  this.Around(function(runScenario) {
    // Mock modules with less priority
    var dependencies = [
      'myApp',
      'ngMockE2E'
    ].concat(defaultMocks.MODULE_LIST);

    browser.addMockModule('myMocks', function(dependencies) {
      angular.module('myMocks', dependencies)
        .run(function($http, $httpBackend) {
          // Pass all of the rest of the requests
          $httpBackend.whenGET(/.*/).passThrough();
          $httpBackend.whenPOST(/.*/).passThrough();
        });
    }, dependencies);

    runScenario(function(callback) {
      browser.removeMockModule('myMocks');
      callback();
    });
  });

};

module.exports = hooks;
