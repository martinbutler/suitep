'use strict';

describe('Controller: UpdatetaskCtrl', function () {

  // load the controller's module
  beforeEach(module('suitePApp'));

  var UpdatetaskCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdatetaskCtrl = $controller('UpdatetaskCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
