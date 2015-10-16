'use strict';

angular.module('tokenauthApp')
.controller('LoginCtrl', function ($scope, alert, auth, $auth) {

	 
  	$scope.submit = function(){
      console.log("working");

      var user = {
        email: $scope.email,
        password: $scope.password
      };
      
  		$auth.login(user).then(function(res){
        console.log("success");
  			alert('success', 'Login Sucessful!', 'Welcome, ' + res.data.user.email + '!');        	
  		})
  		.catch(handleError);
  	};


    $scope.authenticate = function(provider){
      $auth.authenticate(provider).then(function(res){
        alert('success', 'Login Sucessful!', 'Welcome, ' + res.data.user.displayName + '!');                 
      }, handleError);
    };


    function handleError(err){
      console.log('error here');
      alert('warning', 'Opps!', 'We might have a mistake - ' + err);
    }
  });