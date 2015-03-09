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

app.controller('userCtrl', function ($scope, $state, AuthService, user, User) {
	$scope.user = user;
    // $scope.user.isAdmin = true;
	$scope.isAuthenticated = AuthService.isAuthenticated();

	$scope.logout = function(){
		AuthService.logout();
		console.log("logging out")
		$state.go('home');
	}

    $scope.activeTab = 0;

    $scope.checkFieldIfEmpty = function(data) {
        if (data.length === 0) {
            return 'This field can\'t be blank';
        }
    };

    $scope.checkIfPasswordCorrect = function(data) {
        
    };

    $scope.checkNewPasswordMatch = function(data) {

    }; 

    $scope.updateUser = function() {
        User.update({ id: user._id }, $scope.user).$promise.then(function(userUpdated) {
            console.log(userUpdate);
        });
    };

});