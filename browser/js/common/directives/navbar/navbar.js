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

app.controller('NavbarController', function ($scope, $state) {
	$scope.goTo = function(stateName) {
		return $state.go(stateName);
	}
	

	$scope.aside = {
	  "title": "Cart"
	};

});