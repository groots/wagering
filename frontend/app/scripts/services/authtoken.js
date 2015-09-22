'use strict';

/**
 * @ngdoc service
 * @name tokenauthApp.authToken
 * @description
 * # authToken
 * Factory in the tokenauthApp.
 */
angular.module('tokenauthApp')
  .factory('authToken', function ($window) {

    var storage = $window.localStorage;
    var cachedToken;
    var userToken =  'userToken';

    var authToken = {
      setToken: function(token) {
        //cached token allows us to have token in memory without having loaded it from local storage
        cachedToken = token;
        storage.setItem(userToken, token);
        var isAuthenticated = true;
      }, 
      getToken: function(){
        if(!cachedToken){
          cachedToken = storage.getItem(userToken);
        }
        return cachedToken;
      }, 
      isAuthenticated: function(){
        return !!authToken.getToken();
      }, 
      removeToken: function(){
        cachedToken = null;
        storage.removeItem(userToken); 
      }
    };

    return  authToken;
  });
