'use strict';

angular.module('suitePApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('projectDashboard', {
        url: '/projectDashboard',
        templateUrl: 'app/projectDashboard/projectDashboard.html',
        controller: 'ProjectdashboardCtrl'
      });
  });