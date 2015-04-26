'use strict';

(function(isNode, isAngular) {

  var mockModules = [
    'ngMockE2E',
    'myMocks.utils',
    'myMocks.authenticationService'
  ];

  function addAngularMockModule() {
    angular.module('myMocks', mockModules)
      .run(function($http, $httpBackend) {
        // Pass through all request
        $httpBackend.whenGET(/.*/).passThrough();
        $httpBackend.whenPOST(/.*/).passThrough();
        $httpBackend.whenPUT(/.*/).passThrough();
        $httpBackend.whenDELETE(/.*/).passThrough();
      });

    //add myMocks as dependency of the app's main
    // module so it gets loaded
    angular.module('myApp')
      .requires.push('myMocks');
  }

  if (isAngular) {
    addAngularMockModule();
  } else if (isNode) {
    //TODO: configure hooks.js for support of mocks on E2E test
    module.exports.MODULE_LIST = mockModules;
  } else {
    throw new Error('Error injecting mock module');
  }

})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined');
