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

  .constant('API_URL', 'http://localhost:3000/');