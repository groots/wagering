'use strict';

/**
 * @ngdoc function
 * @name tokenauthApp.controller:WagersCtrl
 * @description
 * # WagersCtrl
 * Controller of the tokenauthApp
 */
angular.module('tokenauthApp')
  .controller('WagersCtrl', function ($scope, $http, API_URL, alert) {
  	$http.get(API_URL + 'wagers')
  	.success(function(wagers){
  		$scope.wagers = wagers;
  	}).error(function(err){
  		alert('warning', 'Does not exist', err.message);
  	});
  });
