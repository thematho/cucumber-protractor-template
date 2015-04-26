'use strict';
/**
 * @ngdoc service
 * @name myMocks.utils:
 * @description
 * Package
 */
angular.module('myMocks.utils')
  .service('urlParser', function() {

    function getQueryParamByName(queryString, name) {
      var params = {},
        queries, temp, i, l;

      // Split into key/value pairs
      queries = queryString.split('?')[1].split('&');

      // Convert the array of strings into an object
      for (i = 0, l = queries.length; i < l; i++) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
      }

      return params[name];
    }

    return {
      getQueryParamByName: getQueryParamByName
    };
  });