'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'mgcrea.ngStrap']);

app.controller('MainController', function ($scope) {

    // Given to the <navbar> directive to show the menu.
    $scope.dropdownCategories = [
      {
        "text": "PS4",
        "href": "#"
      },
      {
        "text": "Xbox One",
        "href": "#"
      },
      {
        "text": "Xbox 360",
        "href": "#"
      },
      {
        "divider": true
      },
      {
        "text": "Separated link",
        "href": "#separatedLink"
      }
    ];

    $scope.dropdownGenres = [
      {
        "text": "Fantasy",
        "href": "#"
      },
      {
        "text": "RPG",
        "href": "#"
      },
      {
        "text": "First Person Shooter",
        "href": "#"
      },
      {
        "divider": true
      },
      {
        "text": "Separated link",
        "href": "#separatedLink"
      }
    ];

    $scope.aside = {
      "title": "Cart"
    };


});


app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});