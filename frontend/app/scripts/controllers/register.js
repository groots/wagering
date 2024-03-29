'use strict';

/**
 * @ngdoc register
 * @name tokenauthApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the tokenauthApp
 */
angular.module('tokenauthApp')
  .controller('RegisterCtrl', function ($scope, alert, auth, $auth, $state, checkStrength) {

    $scope.$watch('user.password', function(password){
      $scope.passwordStrength = checkStrength.strength(password);
      console.log($scope.passwordStrength);
      if ($scope.isPasswordOk()) {
        //invliadate form
      } else {
        //set as valid
      }
    });

    $scope.isPasswordWeak = function(){
      return $scope.passwordStrength < 40; 
    };

    $scope.isPasswordOk = function(){
      return $scope.passwordStrength >= 40 && $scope.passwordStrength <= 70; 
    };

    $scope.isPasswordStrong = function(){
      return $scope.passwordStrength > 70; 
    };


  	$scope.submit = function(){

  		$auth.signup({
        email: $scope.email, 
        password: $scope.password
      })
  		.then(function(res){
  			alert('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '!');
        $state.go('dashboard');
  		})
  		.catch(function(err){
  			alert('warning', 'Opps!', 'We might have a mistake - ' + err);
  		});
  	};

  });


// $(document).ready(function() {
//     var result = $("#password-strength");
  
//     $('#password').keyup(function(){
//         $(".bar-text").html(checkStrength($('#password').val()));
//     });  
 
//     function checkStrength(password){
 
//     //initial strength
//     var strength = 0;
    
//     if (password.length === 0){
//         result.removeClass();
//         return '';
//     }
//     //if the password length is less than 7, return message.
//     if (password.length < 9){
//         result.removeClass();
//         result.addClass('normal');
//         return 'Normal';
//     }
 
//     //length is ok, lets continue.
 
//     //if length is 8 characters or more, increase strength value
//     if (password.length > 9){
//       strength += 1;
//     } 
 
//     //if password contains both lower and uppercase characters, increase strength value
//     if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){
//       strength += 1;
//     }
 
//     //if it has one special character, increase strength value
//     if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)){
//       strength += 1;
//     }
 
//     //if it has two special characters, increase strength value
//     if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,",%,&,@,#,$,^,*,?,_,~])/)){
//       strength += 1;
//     } 
 
//     //now we have calculated strength value, we can return messages
 
//     //if value is less than 2
//     if (strength < 2) {
//         result.removeClass();
//         result.addClass('medium');
//         return 'Medium';
//     } else if (strength === 2 ) {
//         result.removeClass();
//         result.addClass('strong');
//         return 'Strong';
//     } else {
//         result.removeClass();
//         result.addClass('vstrong');
//         return 'Very Strong';
//     }
//   }
// });