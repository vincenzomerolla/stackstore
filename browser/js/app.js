'use strict';

var app = angular.module('FullstackGeneratedApp', ['ngResource', 'ngSanitize', 'ui.router', 'fsaPreBuilt', 'mgcrea.ngStrap','xeditable', 'ngAnimate','angular-stripe']);


app.controller('MainController', function (AuthService) {

    // Given to the <navbar> directive to show the menu.
  


});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});


app.run(function ($rootScope, $state, AuthService, editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    
    AuthService.getLoggedInUser().then(function (user) {
      //console.log(user);
        
    });
  }) 
});