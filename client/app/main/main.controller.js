'use strict';

angular.module('suitePApp')
  .config(function($modalProvider) {
    angular.extend($modalProvider.defaults, {
      html: true
    });
  })

  .controller('MainCtrl', function ($scope, $http, socket, $aside, $modal) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

  $scope.modal = {title: 'Title', content: 'Hello Modal<br />This is a multiline message!'};

  });

