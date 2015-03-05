'use strict';
app.directive('login',function(AuthService, Session, AUTH_EVENTS){

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

			scope.isAuthenticated = AuthService.isAuthenticated();
			scope.$on(AUTH_EVENTS.loginSuccess, function(user) {
				scope.isAuthenticated = AuthService.isAuthenticated();
				scope.user = Session.user;
				$rootScope.$broadcast(scope.user);
			})
		}
	};
});