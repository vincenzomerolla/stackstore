'use strict';
app.directive('user',function($http,Session){

	return {
		restrict : "E",
		templateUrl : "js/common/directives/user/user.html",
		link : function(scope,element,attribute){
		}
	};
});