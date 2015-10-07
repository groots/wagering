'use strict';

/**
 * @ngdoc register
 * @name tokenauthApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the tokenauthApp
 */
angular.module('tokenauthApp')
  .controller('RegisterCtrl', function ($scope, alert, auth) {
  	$scope.submit = function(){

  		auth.register($scope.email, $scope.password)
  		.success(function(res){
  			alert('success', 'Account Created!', 'Welcome, ' + res.user.email + '!');
  		})
  		.error(function(err){
  			alert('warning', 'Opps!', 'We might have a mistake - ' + err);
  		});
  	};
  });
