'use strict';
app.directive('login',function(AuthService, Session, AUTH_EVENTS,$rootScope,$window,$location,$http,$state){

	return {
		restrict : "E",
		templateUrl : "js/common/directives/login/login.html",
		link : function(scope,element,attribute){
			scope.userInfo = {};
			scope.formSubmit = function(){
				//send a json to the local authentication
				//post to /api/login
				AuthService.login(scope.userInfo).then()
			};

			scope.newUserInfo = {};

			scope.signUp = function(){
				console.log(scope.newUserInfo);
				$http.post('api/users',scope.newUserInfo).then(function(data){
					AuthService.login(scope.newUserInfo).then(function(){
						scope.isAuthenticated = AuthService.isAuthenticated();
						console.log(scope.isAuthenticated);
						$state.go('user');
					});
				});
			};

			scope.loginhref = function(dir){
				$window.location.href="/auth/"+dir;
			};

			scope.isAuthenticated = AuthService.isAuthenticated();

			scope.tabs={}
			scope.tabs.activeTab = 0;
		}
	};
});