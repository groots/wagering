'use strict';

/**
 * @ngdoc function
 * @name tokenauthApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the tokenauthApp
 */
angular.module('tokenauthApp')
  .controller('HeaderCtrl', function ($scope, authToken) {
  	$scope.isAuthenticated = authToken.isAuthenticated;
  });
