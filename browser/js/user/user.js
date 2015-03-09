'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('user', {
        url: '/user',
        controller: 'userCtrl',
        templateUrl: 'js/user/user.html',
        resolve: {
          user: function(AuthService) {
            // return AuthService.getLoggedInUser().then(function(data){
            // 	if(data.user) return data.user;
            // 	else return data;
            // });
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

    $scope.activeTab = 0;

    $scope.checkFieldIfEmpty = function(data) {
        if(data.length === 0) {
            return 'This field can\'t be blank';
        }
    }

});