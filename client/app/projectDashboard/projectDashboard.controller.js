'use strict';

angular.module('suitePApp')
  .controller('ProjectdashboardCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $http.get('api/users/projects/'+currentUser._id).
        success(function(data, status, headers, config) {
          $scope.projectData = data;
        });
  
    $scope.$watch('selectedProject', function() {
      $scope.meetingNotes = '';
      console.log('ding');
        if ($scope.selectedProject) {
          $http.get('api/projects/meetings/'+$scope.selectedProject._id).
            success(function(data, status, headers, config) {
              $scope.projectMeetings = data;
              console.log($scope.projectMeetings);
              });   
          }
      });

    $scope.$watch('selectedMeeting', function() {
        if ($scope.selectedMeeting) {
          $scope.meetingNotes = $scope.selectedMeeting.notes;
        } else {
          $scope.meetingNotes = '';
        }
      });


  });

