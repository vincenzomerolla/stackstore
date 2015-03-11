'use strict';
app.directive('showValidation', [function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs, ctrl) {

			if (element.get(0).nodeName.toLowerCase() === 'form') {
				element.find('.form-group').each(function(i, formGroup) {
					showValidation(angular.element(formGroup));
				});
			} else {
				showValidation(element);
			}

			function showValidation(formGroupEl) {
				var input = formGroupEl.find('input[ng-model],textarea[ng-model]');
				if (input.length > 0) {
					scope.$watch(function() {
						return input.hasClass('ng-invalid');
					}, function(isInvalid) {
						formGroupEl.toggleClass('has-error', isInvalid);
					});
				}
			}
		}
	};
}]);

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