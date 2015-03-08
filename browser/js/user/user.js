'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('user', {
        url: '/user',
        controller: 'userCtrl',
        templateUrl: 'js/user/user.html',
        resolve: {
          user: function(AuthService) {
    		return AuthService.getLoggedInUser();
          }
        }
    });



});

app.controller('userCtrl', function ($scope, $state, AuthService, user) {
	$scope.user = user;
	$scope.isAuthenticated = AuthService.isAuthenticated();

	$scope.logout = function(){
		AuthService.logout();
		console.log("logging out")
		$state.go('home');
	}
});