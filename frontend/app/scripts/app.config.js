'use strict';

angular
  .module('tokenauthApp').config(function($urlRouterProvider,$stateProvider, $httpProvider ){
  	$urlRouterProvider.otherwise('/');
  	$stateProvider
  	.state('main', {
  		url: '/',
  		templateUrl: '/views/main.html'
  	})
    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    })
  	.state('register', {
  		url: '/register',
  		templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'
  	})
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl'
    })
    .state('wagers', {
      url: '/wagers',
      templateUrl: '/views/wagers.html',
      controller: 'WagersCtrl'
    })
    .state('pricing', {
      url: '/pricing',
      templateUrl: '/views/pricing.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: '/views/contact.html'
    });

    $httpProvider.interceptors.push('authInterceptor');
  })

  .constant('API_URL', 'http://localhost:3000/')
  .run(function($window){
    var params = $window.location.search.substring(1);
    if(params && $window.opener && $window.opener.location.origin === $window.location.origin){
      var pair = params.split('=');
      var code = decodeURIComponent(pair[1]);

      $window.opener.postMessage(code, $window.location.origin);
    }
  });