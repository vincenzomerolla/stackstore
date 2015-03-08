'use strict'
app.directive('cartItem', function () {
	return {
    replace: true,
		restrict: 'E',
    require: '^cart',
    scope: {
      item: '='
    },
		templateUrl: 'js/common/directives/cart-item/cart-item.html',

    
  
	}
});

