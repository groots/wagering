'use strict';

angular.module('tokenauthApp')
.controller('LoginCtrl', function ($scope, alert, auth, $auth, $state) {

	 
  	$scope.submit = function(){
          $auth.login({
              email: $scope.email,
              password: $scope.password
              }).then(function(res){

                  var message = 'Thanks for coming back ' + res.data.user.email + '!';

                  if(!res.data.user.active){
                    message = 'Just a reminder, please activate your account soon !';
                  }

                  alert('success', 'Welcome', message);

                  $state.go('dashboard'); 
              }).catch(handleError);
  	};


    $scope.authenticate = function(provider){
      $auth.authenticate(provider).then(function(res){
        alert('success', 'Login Sucessful!', 'Welcome, ' + res.data.user.displayName + '!');  
        $state.go('dashboard');                
      }, handleError);
    };


    function handleError(err){
      alert('warning', 'Opps!', 'We might have a mistake - ' + err);
    }
  });