'use strict';


angular.module('suitePApp')
  .controller('NotesdashlayoutCtrl', function ($scope) {
    $scope.message = 'Hello';
  });



angular.module('userlist', [])
  .controller('userlistCtrl', function( $scope, $timeout, container, state, $window, $http) {
    var selectedUser = {};

    $scope.users = [
      { name: 'Jackson Turner', street: '217 Tawny End', img: 'men_1.jpg' },
      { name: 'Megan Perry', street: '77 Burning Ramp', img: 'women_1.jpg' },
      { name: 'Ryan Harris', street: '12 Hazy Apple Route', img: 'men_2.jpg' },
      { name: 'Jennifer Edwards', street: '33 Maple Drive', img: 'women_2.jpg' },
      { name: 'Noah Jenkins', street: '423 Indian Pond Cape', img: 'men_3.jpg' }
    ];

    $timeout(function(){
      $scope.select( $scope.users[ state.selectedUserIndex ] );
    });

    $scope.select = function( user ) {
      selectedUser.isSelected = false;
      user.isSelected = true;
      selectedUser = user;
      container.extendState({ selectedUserIndex: $scope.users.indexOf( user ) });
      container.layoutManager.eventHub.emit( 'userSelected', user );
    };

    var currentUser = $window.currentUser;
    console.log("currentUser", currentUser);

    // $http.get('/api/project/'+ currentUser._id).
    //   success(function(data, status, headers, config) {
    //     console.table({data: data}, {status: status}, {headers: headers}, {config: config});
    //   }).
    //   error(function(data, status, headers, config) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     console.table({data: data}, {status: status}, {headers: headers}, {config: config});
    //   });


  });

  
angular.module('userdetails', [] )
  .controller('userdetailsCtrl', function( $scope, container, state) {
    $scope.user = state.user || null;
    // $scope.htmlcontent = state.htmltexttest || null;

    container.layoutManager.eventHub.on( 'userSelected', function( user ){
      $scope.user = user;
      container.extendState({ user: user });
      $scope.$apply();
    });
  });

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
  
  .controller('demoController', function($scope, $http, $aside, $window) {
    $scope.orightml = '<p><img class="ta-insert-video" ta-insert-video="http://www.youtube.com/embed/j7_lSP8Vc3o" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/></p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
    $scope.htmlcontent = $scope.orightml;
    $scope.disabled = false;

    var currentUser = $window.currentUser;


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
    
    $scope.createActionItem = function() {
      if($scope.actItemTxt === '') {
        return;
      }
      $scope.actItemTxt = '';
    };

    // consider using a factory for call back success.
    $scope.sendEmail = function() {
      if($scope.htmlcontent === '' || $scope.projectName === undefined) {
        return;
      }
      $http.post('/api/sendMails', { content: $scope.htmlcontent, projectName: $scope.projectName, replyTo: currentUser.email, name: currentUser.name});
    };


    $scope.saveNotes = function() {
      if($scope.htmlcontent === '' || $scope.projectName === undefined) {
        return;
      }
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd<10) {
          dd='0'+dd
      } 

      if(mm<10) {
          mm='0'+mm
      } 

      today = yyyy+'/'+mm+'/'+dd;

      if ($window.project_id === undefined) {
        $http.post('/api/projects', { user: currentUser._id, name: $scope.projectName, Startdate: today}).
        success(function(data, status, headers, config) {
          // console.table({data: data}, {status: status}, {headers: headers}, {config: config});
          $window.project_id = data._id;

          $http.post('/api/meetingNotess', { notes: $scope.htmlcontent, user: currentUser._id, project: data._id, date: today}).
            success(function(data, status, headers, config) {
              $window.meetingNote_id = data._id;
              $http.put('/api/projects/updateMeeting/'+$window.project_id, { meetingNotes: data._id});
            });
          $http.put('/api/users/project/'+currentUser._id, {project: data._id});
        }).
          error(function(data, status, headers, config) {
        });
      } else if ($window.meetingNote_id === undefined) {
        $http.post('/api/meetingNotess', { notes: $scope.htmlcontent, user: currentUser._id, project: $window.project_id, date: today}).
          success(function(data, status, headers, config) {
            $window.meetingNote_id = data._id;
            console.log('data.id:', data._id);
            $http.put('/api/projects/updateMeeting/'+$window.project_id, { meetingNotes: data._id});
          });
      } else {
        $http.put('/api/meetingNotess/'+$window.meetingNote_id, { notes: $scope.htmlcontent});
      }
    };
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
      title: 'Notes',
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
        title: 'Registered Users',
        componentName: 'angularModule',
        componentState: {
          module: 'userlist',
          templateId: 'userlistTemplate',
          selectedUserIndex: 0
        }
      },{
        type: 'component',
        title: 'Selected User',
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