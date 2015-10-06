'use strict';

describe('Controller: WagersCtrl', function () {

  // load the controller's module
  beforeEach(module('tokenauthApp'));

  var WagersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WagersCtrl = $controller('WagersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WagersCtrl.awesomeThings.length).toBe(3);
  });
});
