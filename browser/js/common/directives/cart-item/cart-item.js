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
      console.log(ctrl)

      scope.removeProduct = function(item) {

        Product.get({_id: item.id}).$promise.then(function(product) { 
          var newInventory = product.inventory+item.qty;
          return Product.update({_id: product._id}, {inventory: newInventory}).$promise;    
        })
        .then(function() {

          Cart.removeProduct(item);
          ctrl.getItems()

        })
        .catch(function(err) {
          swal({
            title: 'Cannot add!',
            text: err,
            type: 'error',
            timer: 2000
          });
        })
      }
    }

    
  
	}
});

