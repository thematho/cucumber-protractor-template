'use strict';

angular.module('myApp')
  .controller('AppCtrl', function(
    $scope, $window, $modal) {

    var LOGIN_DATA_KEY = 'userData';

    $scope.openLoginDialog = function() {
      var modalInstance = $modal.open({
        templateUrl: 'views/login-dialog.tpl.html',
        controller: 'loginCtrl',
        size: 'sm'
      });

      modalInstance.result.then(function(userData) {
        $scope.isAuthenticated = true;
        $scope.user = userData;
        $window.localStorage.setItem(LOGIN_DATA_KEY, JSON.stringify(userData));
      });
    };

    $scope.logout = function() {
      $scope.isAuthenticated = false;
      $scope.user = null;
      $window.localStorage.removeItem(LOGIN_DATA_KEY);
    };
  });