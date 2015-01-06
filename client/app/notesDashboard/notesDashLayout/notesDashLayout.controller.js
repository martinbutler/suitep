'use strict';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
angular.module('suitePApp')
  .controller('NotesdashlayoutCtrl', function ($scope) {
    $scope.message = 'Hello';
  });


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
angular.module('userlist', ['mgcrea.ngStrap', 'ngAnimate', 'ngSanitize'])

  .config(function($selectProvider) {
    angular.extend($selectProvider.defaults, {
      animation: 'am-flip-x',
      sort: false
    });
  })


  .controller('userlistCtrl', function( $scope, $timeout, container, state, $window, $http) {
    var selectedUser = {};

    $scope.users = [];

    // $timeout(function(){
    //   $scope.select( $scope.users[ state.selectedUserIndex ] );
    // });

    var currentUser = $window.currentUser;

    $scope.select = function( user ) {
      console.log('ding');
      selectedUser.isSelected = false;
      user.isSelected = true;
      selectedUser = user;
      container.extendState({ selectedUserIndex: $scope.users.indexOf( user ) });
      container.layoutManager.eventHub.emit( 'userSelected', user );
      container.layoutManager.eventHub.emit( 'testCurrentUser', currentUser );

      //  container.layoutManager.eventHub.on( 'projectName', function( newProjectName ){
      //   $scope.projectName = newProjectName;
      //   // container.extendState({ projectName: projectName });
      //   // $scope.$apply();
      // });
      // container.layoutManager.eventHub.emit( 'projectData', projectData );
    };

    container.layoutManager.eventHub.on( 'projectName', function( projectName ){
      $scope.users = {};
      $scope.projectData = {};

            // projectName.contacts.forEach(function(contact_id) {
        $http.get('api/projects/contacts/'+projectName._id).
          success(function(data, status, headers, config) {
            // $scope.users.push( {name: data.name});
            $scope.projectData = data;
            $scope.projectName = projectName;
            $scope.users = data;
            if ($scope.users.length > 0) {
              $scope.teamSet = true;
            }
            container.extendState({ projectName: projectName });

            $http.get('api/users/contacts/'+currentUser._id).
              success(function(data, status, headers, config) {
                console.log('data from contacts call', data);
                $scope.allContacts = data;
              })
          });
         $scope.$apply(); 
    });

    $scope.setTeam = function() {
      // console.log($scope.users);
      $scope.teamSet = true;
      $scope.users.forEach(function(obj) {
        console.log(obj);
        $http.put('/api/projects/contacts/'+$scope.projectName._id, {contact: obj._id});

      })

    };

  });

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
angular.module('userdetails', [] )
  .controller('userdetailsCtrl', function( $scope, container, state, $http) {
    $scope.user = state.user || null;


    // $scope.htmlcontent = state.htmltexttest || null;
    // select stuff: *****************************************
    var selectedAction = {};
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) { dd='0'+dd };
    if(mm<10) { mm='0'+mm }; 
    today = yyyy+'/'+mm+'/'+dd;
    $scope.select = function( action ) {
      console.log('action ding');
      selectedAction.isSelected = false;
      action.isSelected = true;
      selectedAction = action;
      // container.extendState({ selectedActionIndex: $scope.actions.indexOf( action ) });
      // container.layoutManager.eventHub.emit( 'actionSelected', action );
      console.log(selectedAction);


      var updateTxt = 'CLOSED: ' + today + ':';
      if($scope.newUpdate !== '') {
        updateTxt += ' ' +$scope.newUpdate;
      } 

      $http.put('/api/actionItems/updateUpdates/'+selectedAction._id, {update: updateTxt, completed: true});
      
      console.log('select AI', $scope.actionItems);
      $scope.actionItems.forEach(function (obj) {
        if(obj._id == selectedAction._id) {
          obj.completed = true;
        }
      });

      container.layoutManager.eventHub.emit( 'actionItems', $scope.actionItems );

    };
  

      // ******************************************

    container.layoutManager.eventHub.on( 'userSelected', function( user ){
      $scope.user = user;
      container.extendState({ user: user });
      $scope.$apply();
    });

    container.layoutManager.eventHub.on( 'testCurrentUser', function( tUser ){
      $scope.tUser = tUser;
      container.extendState({ tUser: tUser });
      $scope.$apply();
    });
    $scope.actionItems =[];
    container.layoutManager.eventHub.on( 'projectName', function( projectName ){
      $scope.actionItems = [];
            // projectName.contacts.forEach(function(contact_id) {
        $http.get('api/projects/actions/'+projectName._id).
          success(function(data, status, headers, config) {
            // $scope.ActionItems = data;
            $scope.projectName = projectName;
            container.extendState({ projectName: projectName });
            // data.forEach(function(obj) {
            //   if(!obj.completed) {
            //     $scope.actionItems.push(obj);
            //   }
            // });
            $scope.actionItems = data;
            container.layoutManager.eventHub.emit( 'actionItems', $scope.actionItems );
            
          });
         $scope.$apply(); 
    });
  });

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
angular.module('noteTaking', ['textAngular', 'mgcrea.ngStrap', 'ngAnimate', 'ngSanitize'])
  .config(['$provide', function($provide){
    $provide.decorator('taOptions', ['$delegate', function(taOptions){
      // $delegate is the taOptions we are decorating
      // here we override the default toolbars and classes specified in taOptions.
      taOptions.toolbar = [
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
          ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
          ['justifyLeft','justifyCenter','justifyRight'],
          ['html', 'insertImage', 'insertLink', 'insertVideo']
      ];
      taOptions.classes = {
          focussed: 'focussed',
          toolbar: 'btn-toolbar',
          toolbarGroup: 'btn-group',
          toolbarButton: 'btn btn-default btn-sm btn-small',
          toolbarButtonActive: 'active',
          disabled: 'disabled',
          textEditor: 'form-control',
          htmlEditor: 'form-control'
      };
      return taOptions; // whatever you return will be the taOptions
    }])
    // changing the classes of the icons for the tools for font-awesome v3.x
    $provide.decorator('taTools', ['$delegate', function(taTools){
      taTools.bold.iconclass = 'fa fa-bold';
      taTools.italics.iconclass = 'fa fa-italic';
      taTools.underline.iconclass = 'fa fa-underline';
      taTools.ul.iconclass = 'fa fa-list-ul';
      taTools.ol.iconclass = 'fa fa-list-ol';
      taTools.undo.iconclass = 'fa fa-undo';
      taTools.redo.iconclass = 'fa fa-repeat';
      taTools.justifyLeft.iconclass = 'fa fa-align-left';
      taTools.justifyRight.iconclass = 'fa fa-align-right';
      taTools.justifyCenter.iconclass = 'fa fa-align-center';
      taTools.clear.iconclass = 'fa fa-ban';
      taTools.insertLink.iconclass = 'fa fa-link';
      // taTools.unlink.iconclass = 'icon-link red';
      taTools.insertImage.iconclass = 'fa fa-picture-o';
      taTools.quote.iconclass = 'fa fa-quote-right';
      return taTools;
    }]);
  }])

  // for the pop action item creator
  .config(function($modalProvider) {
    angular.extend($modalProvider.defaults, {
      html: true
    });
  })

  // for the drop down menu for previous projects
  .config(function($selectProvider) {
    angular.extend($selectProvider.defaults, {
      animation: 'am-flip-x',
      placeholder: 'Select A Current Project',
      delay: 300
      // sort: false
    });
  })
  
  .controller('demoController', function($scope, $http, $aside, $window, container) {
    $scope.orightml = '<h4>Suite Productivity Meeting and Task Tracker</h4><p><b>Features:</b></p><ol><li>Take notes in a text editor</li><li>Uses Golden Layout to allow for pop windows, themes, and user controlled layouts.</li><li>Send meeting notes to team members</li><li style="color: blue;">Create Action Items and send email to assignees</li><li>Send Daily Status of open Action Items Manager/Project Lead</li><li>Send action item reminders to task owner of upcoming due dates</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Text Editor Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p><p><b>Golden Layout Code at GitHub:</b> <a href="https://github.com/hoxton-one/golden-layout">Here</a></p><p><b>Node Cron Code at GitHub:</b> <a href="https://github.com/ncb000gt/node-cron">Here</a></p><p></p><p><b>Node Mailer Code at GitHub:</b> <a href="https://github.com/andris9/Nodemailer">Here</a></p><p></p><p><img class="ta-insert-video" ta-insert-video="http://www.youtube.com/embed/Cgovv8jWETM" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/></p><p><br/></p>';
    $scope.htmlcontent = ''; // $scope.orightml;
    $scope.disabled = false;
    // $scope.projectName = {};

    container.layoutManager.eventHub.on( 'actionItems', function( actionItems ){
      $scope.actionItems = actionItems;
      container.extendState({ actionItems: actionItems });
      $scope.$apply();
    });
    container.layoutManager.eventHub.on( 'projectName', function( newProjectName ){
      $scope.projectName = newProjectName;
      // container.extendState({ projectName: projectName });
      // $scope.$apply();
    });

    $scope.$watch('projectName', function() {
        if ($scope.projectName) {
          container.layoutManager.eventHub.emit( 'projectName', $scope.projectName );
          $http.get('api/projects/contacts/'+$scope.projectName._id).
            success(function(data, status, headers, config) {
              $scope.projectTeam = data;
              });   
          }
      });


    var currentUser = $window.currentUser;
    // var projectObjs = [];

    // load the project names into selector.
    // currentUser.projects.forEach(function(project_id) {
      $http.get('api/users/projects/'+currentUser._id).
        success(function(data, status, headers, config) {
          $scope.projectData = data;
        });

    // make actionable button functionality
    $scope.actionItemTextSet = function() {
      if(document.getSelection().anchorNode === null || document.getSelection().anchorNode.attributes) {
        return;
      }
      $scope.actItemTxt = document.getSelection().anchorNode.data;
      var titleLength = ($scope.actItemTxt.indexOf(".") == -1) ? 25 : $scope.actItemTxt.indexOf(".");
      $scope.actItemTitle = $scope.actItemTxt.substring(0, titleLength);
      $scope.actItemTxtLen = $scope.actItemTxt.length > 75 ? 75 : $scope.actItemTxt.length ;
    };
    $scope.actionItemTextClear = function() {
      $scope.actItemTxt = "";
      $scope.actItemTitle = "";
      $scope.actItemTxtLen = 0;
    };

    // for the pop action item creator
    $scope.modal = {title: 'Action Item Creator', content: 'Add your Action Item Title, Assignee, and update Description'};
    $scope.newProjectModal = {title: 'Start New Project', content: 'temp hold - tbd'};
    
    $scope.actItemOwner;
    $scope.createActionItem = function() {
      if($scope.actItemTxt === '') {
        return;
      }
      $http.post('/api/actionItems/', {title: $scope.actItemTitle, 
                                        description: $scope.actItemTxt,
                                        dueDate: $scope.actItemDueDate,
                                        project: $scope.projectName._id,
                                        user: $scope.projectName.user,
                                        owner: $scope.actItemOwner._id,
                                        ownerEmail: $scope.actItemOwner.email,
                                        ownerName: $scope.actItemOwner.name})
      .success(function(data, status, headers, config) {
        $http.put('/api/projects/updateActionItem/'+$scope.projectName._id, { actionItems: data._id}).
          success(function(data, status, headers, config) {
            container.layoutManager.eventHub.emit( 'projectName', $scope.projectName );
          });

        $http.post('api/sendMails/sendTask/', {title: $scope.actItemTitle,
                                              description: $scope.actItemTxt,
                                              dueDate: $scope.actItemDueDate,
                                              projectName: $scope.projectName.name,
                                              user: $window.currentUser.name,
                                              ownerEmail: $scope.actItemOwner.email,
                                              owner: $scope.actItemOwner.name,
                                              actItemID: data._id}).
          success(function(data, status, headers, config) {
            $scope.actItemTxt = '';
          });
        });
    };

    $scope.createNewProject = function() {
      $scope.teamSet = false;
      var projectTemp;
      $http.post('api/projects/', { name: $scope.newProjectName, user: currentUser._id, startDate: (new Date()), userEmail: currentUser.email }).
        success(function(data, status, headers, config) {
          // projectTemp = data;
          $scope.projectName = data;
          $http.put('/api/users/project/'+currentUser._id, {project: data._id});
        });
      
    };

    // consider using a factory for call back success.
    $scope.sendEmail = function() {
      if($scope.htmlcontent === '' || $scope.projectName === undefined) {
        return;
      }
      var emailContent = '<h1>Project: ' + $scope.projectName.name + '</h1>' 
                          + '<h4>__________________________________________________________________________________</h4>'
                          + '<h2>Project Team:</h2><ul>';
      $scope.projectTeam.forEach(function(obj) {
        emailContent += '<li><a href="mailto:' + obj.email + '?subject=' + $scope.projectName.name + '">' + obj.name + '</a></li>'; 
      });
      emailContent += '</ul>' 
                  + '<h4>__________________________________________________________________________________</h4>'
                  + '<h2>Meeting Notes:</h2>'
                  + $scope.htmlcontent
                  + '<h4>__________________________________________________________________________________</h4>'
                  + '<h2>Open Actions Items:</h2>';
      var openActionNumber = 0;
      // var count = 0;
      $scope.actionItems.forEach(function (aIobj) {

        if(!aIobj.completed) {
          openActionNumber++;
          var aiDueDate = new Date(aIobj.dueDate);
          emailContent += '<p>' + openActionNumber + ') Title: <strong>' + aIobj.title + '</strong></p>'
                        + '<p>Description: ' + aIobj.description + '</p>'
                        + '<p>Due Date: ' + (aiDueDate.getMonth()+1) + '/' + (aiDueDate.getDate()) + '/' + (aiDueDate.getFullYear()) + '</p>'
                        + '<p>Owner: <a href="mailto:' + aIobj.ownerEmail + '?subject=' + aIobj.title + '">' 
                          + aIobj.ownerName +'</a></p>';
          if (aIobj.updates.length > 0) {
            emailContent += '<p>Last Update ' + aIobj.updates[aIobj.updates.length-1] + '</p>';
          } 
        }
      });
      emailContent += '<div itemprop="action" itemscope itemtype="http://schema.org/ViewAction"><link itemprop="url" href="https://github.com/pouchdb/pouchdb/pull/3015#issuecomment-64062956"></link><meta itemprop="name" content="View Pull Request"></meta></div>';
      setTimeout(function(){
        $http.post('/api/sendMails', { content: emailContent, projectName: $scope.projectName, 
                                      replyTo: currentUser.email, name: currentUser.name, 
                                      actionItems: $scope.actionItems, projectTeam: $scope.projectTeam});
      }, 500);
    };


    $scope.saveNotes = function() {
      if($scope.htmlcontent === '' || $scope.projectName === undefined) {
        return;
      }
      // create a variable to get today's date.
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd<10) { dd='0'+dd };
      if(mm<10) { mm='0'+mm }; 
      today = yyyy+'/'+mm+'/'+dd;
      // for creating projects and meeting notes... first iteration for seeding data
      // if ($window.project_id === undefined) {
      //   $http.post('/api/projects', { user: currentUser._id, name: $scope.projectName, Startdate: today}).
      //   success(function(data, status, headers, config) {
      //     // console.table({data: data}, {status: status}, {headers: headers}, {config: config});
      //     $window.project_id = data._id;

      //     $http.post('/api/meetingNotess', { notes: $scope.htmlcontent, user: currentUser._id, project: data._id, date: today}).
      //       success(function(data, status, headers, config) {
      //         $window.meetingNote_id = data._id;
      //         $http.put('/api/projects/updateMeeting/'+$window.project_id, { meetingNotes: data._id});
      //       });
      //     $http.put('/api/users/project/'+currentUser._id, {project: data._id});
      //   }).
      //     error(function(data, status, headers, config) {
      //   });
      // } else 
      if ($window.meetingNote_id === undefined) {
        $http.post('/api/meetingNotess', { notes: $scope.htmlcontent, user: currentUser._id, project: $scope.projectName_id, date: today}).
          success(function(data, status, headers, config) {
            $window.meetingNote_id = data._id;
            $http.put('/api/projects/updateMeeting/'+$scope.projectName._id, { meetingNotes: data._id});
          });
      } else {
        $http.put('/api/meetingNotess/'+$window.meetingNote_id, { notes: $scope.htmlcontent});
      }
    }; // end of saveNotes

  });


var AngularModuleComponent = function( container, state ) {
  var html = $( '#' + state.templateId ).html(),
    element = container.getElement().css('overflow', 'scroll');
  
  element.html( html );

  angular
    .module( state.module )
    .value( 'container', container )
    .value( 'state', state );

  angular.bootstrap( element[ 0 ], [ state.module ] );
};

var myLayout = new GoldenLayout({
  content:[{
    type: 'row',
    content: [{
      width: 75,
      title: 'Project Notes',
      type: 'component',
      componentName: 'angularModule',
      componentState: {
        module: 'noteTaking',
        templateId: 'noteTakingTemplate'
      }
    },{
      type: 'column',
      content: [{
        type: 'component',
        title: 'Project Team',
        componentName: 'angularModule',
        componentState: {
          module: 'userlist',
          templateId: 'userlistTemplate',
          selectedUserIndex: 0
        }
      },{
        type: 'component',
        title: 'Action Items',
        componentName: 'angularModule',
        componentState: {
          module: 'userdetails',
          templateId: 'userDetailTemplate'
        }
      }]
    }]
  }]
});


myLayout.registerComponent( 'angularModule', AngularModuleComponent );