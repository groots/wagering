'use strict';

/**
 * @ngdoc register
 * @name tokenauthApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the tokenauthApp
 */
angular.module('tokenauthApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $http, alert) {
  	$scope.submit = function(){

      var url = "http://localhost:3000/register";
      var user = {
        email: $scope.email,
        password: $scope.password
      };


  		$http.post(url, user)
  		.success(function(){
  			alert('success', 'Success', 'You have Been Registered');
  		})
  		.error(function(err){
  			alert('warning', 'Opps!', 'We might have a mistake - ' + err);
  		});
  	};
  });
