'use strict'
app.directive('cartItem', function () {
	return {
		restrict: 'E',
    require: '^cart',
		scope: {
			product: '='
		},
		templateUrl: 'js/common/directives/cart-item/cart-item.html',
		link: function(scope, element, attrs, CartCtrl) {
      console.log(CartCtrl)
      scope.add = CartCtrl.add;
    }
	}
});

