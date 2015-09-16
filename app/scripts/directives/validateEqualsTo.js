'use strict';

/**
 * @ngdoc directive
 * @name tokenauthApp.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('tokenauthApp')
  .directive('validateEqualsTo', function () {
    return {
    	require: 'ngModel',
    	link: function(scope, element, attrs, ngModelCtrl){
    		function validateEqual(value){
    			var valid = (value === scope.$eval(attrs.validateEqualsTo));
    			ngModelCtrl.$setValidity('equal', valid);
    			return valid ? value : undefined;
    		}
    		ngModelCtrl.$parsers.push(validateEqual);
    		ngModelCtrl.$formatters.push(validateEqual);
    		scope.$watch(attrs.validateEqual, function(){
    			ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
    		});
    	}
    };
  });
