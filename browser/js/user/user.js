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
	// console.log(Session);
	// var a = AuthService.getLoggedInUser();

	// $http.get('/session').then(function(res){
	// 	$scope.user = res.data.user;
	// })

	$scope.user = user;
	$scope.isAuthenticated = AuthService.isAuthenticated();
	console.log($scope.isAuthenticated);

	$scope.logout = function(){
		AuthService.logout();
		console.log("logging out")
		$state.go('home');
	}
});