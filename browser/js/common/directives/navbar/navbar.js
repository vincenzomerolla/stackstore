'use strict';
app.directive('navbar', function () {
    return {
        restrict: 'E',
        scope: {
          items: '='
        },
        templateUrl: 'js/common/directives/navbar/navbar.html',
        controller: 'NavbarController'
    };
});

app.controller('NavbarController', function ($scope) {
	$scope.dropdownCategories = [
	  {
	    "text": "TO BE REPLACED",
	    "href": "#"
	  },
	  {
	    "text": "TO BE REPLACED",
	    "href": "#"
	  },
	  {
	    "text": "TO BE REPLACED",
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
	    "text": "TO BE REPLACED",
	    "href": "#"
	  },
	  {
	    "text": "TO BE REPLACED",
	    "href": "#"
	  },
	  {
	    "text": "TO BE REPLACED",
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

	$scope.dropdownAccount = [
	  {
	    "text": "TO BE REPLACED",
	    "href": "#"
	  },
	  {
	    "text": "TO BE REPLACED",
	    "href": "#"
	  },
	  {
	    "text": "TO BE REPLACED",
	    "href": "#"
	  }
	];
	

	$scope.aside = {
	  "title": "Cart"
	};
});