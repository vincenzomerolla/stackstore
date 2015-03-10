'use strict'
app.directive('cartItem', function (Product, Cart) {
	return {
    replace: true,
		restrict: 'E',
    require: '^cart',
    scope: {
      item: '='
    },
		templateUrl: 'js/common/directives/cart-item/cart-item.html',
    link: function(scope, element, attrs, ctrl) {
      
      scope.removeProduct = function(item) {
        Product.get({_id: item.id}).$promise.then(function(product) {
          product.inventory 
        })
      }
    }

    
  
	}
});

