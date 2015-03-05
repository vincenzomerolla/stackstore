'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('user', {
        url: '/user',
        controller: 'userCtrl',
        templateUrl: 'js/user/user.html'
    });



});

app.controller('userCtrl', function ($scope,$http,AuthService,$state,Session) {
	var a = AuthService.getLoggedInUser();
	console.log(a);
	a.then(function(data){
		$scope.user = data.user;
	})
	// $scope.user = Session.user;
	$scope.isAuthenticated = AuthService.isAuthenticated();

	$scope.logout = function(){
		AuthService.logout();
		console.log("logging out")
		$state.go('home');
	}
});