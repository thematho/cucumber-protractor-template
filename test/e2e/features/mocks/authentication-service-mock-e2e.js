'use strict';

exports.authenticationError404 = function() {
  angular.module('authenticationError404', ['myApp', 'ngMockE2E'])
    .run(function($httpBackend) {
      $httpBackend.whenPOST('/services/login').respond(function() {
        return [404, 'Internal Error', {}];
      });

    });
};

exports.authenticationError500 = function() {
  angular.module('authenticationError500', ['myApp', 'ngMockE2E'])
    .run(function($httpBackend) {
      $httpBackend.whenPOST('/services/login').respond(function() {
        return [500, 'Internal Error', {}];
      });

    });
};