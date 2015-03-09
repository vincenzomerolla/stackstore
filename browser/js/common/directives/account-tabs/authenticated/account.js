'use strict'

app.directive('accountAuth', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/account-tabs/authenticted/account.html',
		controller: 'userCtrl',
		transclude: true
	}
})