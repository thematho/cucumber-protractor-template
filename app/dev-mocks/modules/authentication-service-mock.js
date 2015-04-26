'use strict';

angular.module('myMocks.authenticationService', [])
  .run(function($httpBackend) {
    // Catch login request
    $httpBackend.whenPOST('/services/login')
      .respond(function(method, url, data) {
        var loginData = JSON.parse(data);
        return [200, {
          'userName': loginData.user
        }, {}];
      });
  });