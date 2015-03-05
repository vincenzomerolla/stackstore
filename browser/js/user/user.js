'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('user', {
        url: '/user',
        controller: 'userCtrl',
        templateUrl: 'js/user/user.html'
    });



});

app.controller('userCtrl', function ($scope,$http,AuthService,$state) {
	// console.log(AuthService.logout)
	console.log("hi")
	AuthService.getLoggedInUser(function(data){
		console.log(data);
	});
	$scope.isAuthenticated = AuthService.isAuthenticated();

	$scope.logout = function(){
		AuthService.logout();
		console.log("logging out")
		$state.go('home');
	}
});