'use strict'
app.directive('cartItem', function () {
	return {
		restrict: 'E',
		scope: {
			item: '='
		},
		templateUrl: 'js/common/directives/cart-item/cart-item.html',
		controller: 'CartController'
	}
});

app.controller('CartController', function ($scope) {

});