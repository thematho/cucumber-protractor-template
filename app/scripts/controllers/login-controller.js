'use strict';

angular.module('myApp')
  .controller('loginCtrl',
    function($scope, $modal, $modalInstance, AuthenticationService) {

      $scope.login = function() {
        AuthenticationService.login($scope.user, $scope.password)
          .then(function(response) {
            $modalInstance.close(response.data);
          }, function(response) {
            $modalInstance.close();
            $modal.open({
              templateUrl: 'views/error-dialog.tpl.html',
              controller: 'errorDialogCtrl',
              size: 'sm',
              resolve: {
                errorMessage: function() {
                  return 'Error. status code : ' + response.status;
                }
              }
            });
          });
      };

      $scope.close = $modalInstance.dismiss;

    });