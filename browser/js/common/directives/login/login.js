'use strict';
app.directive('login',function($http){

	return {
		restrict : "E",
		templateUrl : "js/common/directives/login/login.html",
		link : function(scope,element,attribute){
			scope.userInfo = {};
			scope.formSubmit = function(){
				//send a json to the local authentication
				//post to /api/login
				$http.post('/api/login',scope.userInfo)
					.success(console.log('login'))
			};
		}
	};
});