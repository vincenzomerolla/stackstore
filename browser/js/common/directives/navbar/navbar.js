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

app.controller('NavbarController', function ($scope, $state, Session, AuthService,$rootScope,AUTH_EVENTS) {
    AuthService.getLoggedInUser().then(function(data){
        $scope.user = data;
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess,function(){
        $scope.user = null;
    });

    $scope.submitSearch = function(){
        $state.go('product-search',{search: $scope.search})
    }

    $scope.search = "";


	$scope.goTo = function(stateName) {
        // if(stateName == "checkout"){
        //     if(!AuthService.isAuthenticated()){
        //         stateName = "user"
        //     }
        // }
		return $state.go(stateName);
	}
	

	$scope.aside = {
	  "title": "Cart"
	};

});