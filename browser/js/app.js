'use strict';
var app = angular.module('FullstackGeneratedApp', ['ngResource', 'ngSanitize', 'ui.router', 'fsaPreBuilt', 'mgcrea.ngStrap']);

app.controller('MainController', function ($scope) {

    // Given to the <navbar> directive to show the menu.
    


});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});