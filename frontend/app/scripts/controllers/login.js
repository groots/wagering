'use strict';

angular.module('tokenauthApp')
.controller('LoginCtrl', function ($scope, alert, auth, $auth) {

	 
  	$scope.submit = function(){
  		auth.login($scope.email, $scope.password)
  		.success(function(res){
  			alert('success', 'Login Sucessful!', 'Welcome, ' + res.user.email + '!');        	
  		})
  		.error(handleError);
  	};


    $scope.authenticate = function(provider){
      $auth.authenticate(provider).then(function(res){
        alert('success', 'Login Sucessful!', 'Welcome, ' + res.data.user.displayName + '!');                 
      }, handleError);
    };


    function handleError(err){
      alert('warning', 'Opps!', 'We might have a mistake - ' + err);
    }
  });