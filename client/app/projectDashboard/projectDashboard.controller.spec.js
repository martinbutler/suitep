'use strict';

describe('Controller: ProjectdashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('suitePApp'));

  var ProjectdashboardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectdashboardCtrl = $controller('ProjectdashboardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
