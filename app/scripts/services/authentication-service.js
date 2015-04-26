'use strict';

angular.module('myApp.services.authentication', [])
  .factory('AuthenticationService', function($http) {


    return {
      login: function(user, password) {
        return $http.post('/services/login', {
          'user': user,
          'password': password
        }, {});
      }
    };
  });