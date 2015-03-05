'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('user', {
        url: '/user',
        controller: 'userCtrl',
        templateUrl: 'js/user/user.html'
    });



});

app.controller('userCtrl', function ($scope,$http,AuthService,$state) {
	$scope.user = AuthService.getLoggedInUser();

	$scope.logout = function(){
		AuthService.logout;
		$state.go('home')
		
	}
});