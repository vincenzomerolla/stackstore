'use strict';

app.directive('addToCart', function (Cart) {
  // Runs during compile
  return {
    restrict: 'A',
    //transclude: true,
    //require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    //templateUrl: 'js/common/directives/add-to-cart/add-to-cart.html',
    scope: {
      product: '='
    },
    link: function(scope, element, attrs, ctrl, transcludeFn) {

      element.on('click', function(event) {
        event.preventDefault();
        console.log('Added to cart');
        Cart.add(scope.product);
      });
      
    }
  };
});