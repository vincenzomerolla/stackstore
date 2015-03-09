'use strict'

app.directive('account', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/account-tabs/authenticted/account.html',
		controller: 'userCtrl'
	}
})