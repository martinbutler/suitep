'use strict';

angular.module('suitePApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('notesDashboard', {
        url: '/notesDashboard',
        templateUrl: 'app/notesDashboard/notesDashboard.html',
        controller: 'NotesdashboardCtrl'
      });
  });