'use strict';

app
.directive('cart', function (Cart, Product) {
  return {
    replace: true,
    restrict: 'E',
    transclude: true,
    templateUrl: 'js/common/directives/cart/cart.html',
    scope: {},
    controller: 'CartController',
    link: function(scope, element, attrs, ctrl, transclude) {
      var cart = { 
        items: Cart.get()
      };
      scope.cart = cart;


      transclude(scope, function(clone, scope) {
        element.append(clone);
      });
      
    }
  }
})
.controller('CartController', function($scope, Cart) {
  this.getItems = function() {
    $scope.cart.items = Cart.get();
  }

})