'use strict';

angular.module('tokenauthApp')
.controller('LoginCtrl', function ($scope, alert, auth) {

	
  	$scope.submit = function(){
  		auth.login($scope.email, $scope.password)
  		.success(function(res){
  			alert('success', 'Login Sucessful!', 'Welcome, ' + res.user.email + '!');        	
  		})
  		.error(handleError);
  	};


    $scope.google = function(){
      auth.googleAuth().then(function(res){
        alert('success', 'Login Sucessful!', 'Welcome, ' + res.user.displayName + '!');                 
      }, handleError);
    };


    function handleError(err){
      alert('warning', 'Opps!', 'We might have a mistake - ' + err);
    }
  });