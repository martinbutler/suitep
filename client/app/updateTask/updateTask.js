'use strict';

angular.module('suitePApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('updateTask', {
        url: '/updateTask/:actionItemID',
        templateUrl: 'app/updateTask/updateTask.html',
        controller: 'UpdatetaskCtrl'
      });
  });