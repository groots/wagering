'use strict';

/**
 * @ngdoc register
 * @name tokenauthApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the tokenauthApp
 */
angular.module('tokenauthApp')
  .controller('RegisterCtrl', function ($scope,$rootScope, $http, alert) {

  	var url = "/";
  	var user = {};
  	$scope.submit = function(res){
  		$http.post(url, user)
  		.success(function(){
  			console.log("good " + res);
  		})
  		.error(function(err){
  			alert('warning', 'Opps!', 'We might have a mistake');
  		});
  	};
  });
