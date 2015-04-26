'use strict';

angular.module('myApp')
  .controller('errorDialogCtrl',
    function($scope, $modal, $modalInstance, errorMessage) {
      $scope.errorMessage = errorMessage;
      $scope.close = $modalInstance.dismiss;
    });