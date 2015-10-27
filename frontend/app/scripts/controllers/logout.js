'use strict';

/**
 * @ngdoc function
 * @name tokenauthApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the tokenauthApp
 */
angular.module('tokenauthApp')
  .controller('LogoutCtrl', function (authToken, $state, $auth) {
  	$auth.logout();
  	$state.go('main'); 
  });
