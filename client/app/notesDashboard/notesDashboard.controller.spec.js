'use strict';

describe('Controller: NotesdashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('suitePApp'));

  var NotesdashboardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotesdashboardCtrl = $controller('NotesdashboardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
