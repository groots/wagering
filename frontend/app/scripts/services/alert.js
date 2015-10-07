'use strict';

/**
 * @ngdoc service
 * @name tokenauthApp.alert
 * @description
 * # alert
 * Service in the tokenauthApp.
 */
angular.module('tokenauthApp')
  .service('alert', function ($rootScope, $timeout) {
  	var alertTimeout;
  	return function(type, title, message, timeout){
  		$rootScope.alert = {
  			hasBeenShown: true,
  			show: true,
  			type: type, 
  			title: title, 
        message: message

  		};
  		$timeout.cancel(alertTimeout);
  		alertTimeout = $timeout(function(){
  			$rootScope.alert.show = false;
  		}, timeout || 2000);
  	};
  });
