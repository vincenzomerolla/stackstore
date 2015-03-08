'use strict';

app
.directive('cart', function(Cart) {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'js/common/directives/cart/cart.html',
    controller: 'CartController'
  }
})
.controller('CartController', function($scope, Cart) {
  $scope.cart = Cart;
})