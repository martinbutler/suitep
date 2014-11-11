'use strict';

angular.module('suitePApp')
  .controller('UpdatetaskCtrl', function ($scope, $stateParams, $http, $window) {
    var actionItemID = $stateParams.actionItemID;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) { dd='0'+dd };
    if(mm<10) { mm='0'+mm }; 
    today = yyyy+'/'+mm+'/'+dd;
    $scope.today = today;
    var actionData;

    $http.get('api/actionItems/'+actionItemID).
          success(function(data, status, headers, config) {
            actionData = data;
            $scope.title = actionData.title;
            $scope.description = actionData.description;
            $scope.dueDate = Date(actionData.dueDate);
            $http.get('api/contacts/'+actionData.owner).
              success(function(data, status, headers, config) {
                $scope.ownerName = data.name;
                $scope.ownerEmail = data.email;
              });
            $http.get('api/projects/'+actionData.project).
              success(function(data, status, headers, config) {
                $scope.projectName = data.name;
                $http.get('api/users/'+data.user).
                  success(function(data, status, headers, config) {
                    
                  })
              });
            console.log(actionData);
            if (actionData.updates.length > 0) {
              $scope.updates = actionData.updates;
            }
            $scope.isCompleted = actionData.completed;
            
          });

    
    $scope.addUpdate = function() {
      console.log('ding');
      if($scope.newUpdate === '') {
        return;
      }

      var updateTxt = today + ': ' + $scope.newUpdate;

      $http.put('/api/actionItems/updateUpdates/'+actionData._id, {update: updateTxt, completed: false}).
        success(function(data, status, headers, config) {
          $http.post('api/sendMails/sendUpdate/', {title: $scope.title,
                                              description: $scope.description,
                                              dueDate: $scope.dueDate,
                                              projectName: $scope.projectName,
                                              updateTxt: updateTxt,
                                              user: $window.currentUser.name,
                                              userEmail: $window.currentUser.email,
                                              ownerEmail: $scope.ownerEmail,
                                              owner: $scope.ownerName,
                                              actItemID: data._id});

        }) 

    $scope.updateMade = true;
    };

    $scope.taskCompleted = function() {
      var updateTxt = 'CLOSED: ' + today + ':';
      if($scope.newUpdate !== '') {
        updateTxt += ' ' +$scope.newUpdate;
      } 

      $http.put('/api/actionItems/updateUpdates/'+actionData._id, {update: updateTxt, completed: true}).
        success(function(data, status, headers, config) {
          $http.post('api/sendMails/sendUpdate/', {title: $scope.title,
                                              description: $scope.description,
                                              dueDate: $scope.dueDate,
                                              projectName: $scope.projectName,
                                              updateTxt: updateTxt,
                                              user: $window.currentUser.name,
                                              userEmail: $window.currentUser.email,
                                              ownerEmail: $scope.ownerEmail,
                                              owner: $scope.ownerName,
                                              actItemID: data._id});

        }) 

    $scope.updateMade = true;
    };
  });

