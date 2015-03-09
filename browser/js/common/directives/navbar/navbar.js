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

    $scope.submitSearch = function(){
        $state.go('product-search',{search: $scope.search})
    }

    $scope.search = "";


	$scope.goTo = function(stateName) {
		return $state.go(stateName);
	}
	

	$scope.aside = {
	  "title": "Cart"
	};

});