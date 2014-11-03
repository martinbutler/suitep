'use strict';

describe('Controller: NotesdashlayoutCtrl', function () {

  // load the controller's module
  beforeEach(module('suitePApp'));

  var NotesdashlayoutCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotesdashlayoutCtrl = $controller('NotesdashlayoutCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
