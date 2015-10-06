'use strict';

/**
 * @ngdoc service
 * @name tokenauthApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the tokenauthApp.
 */
angular.module('tokenauthApp')
  .factory('authInterceptor', function (authToken) {
    return {
      request: function(config){
        var token = authToken.getToken();
        if(token){
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      response: function( response){
          return response;
      }
    };
  });
