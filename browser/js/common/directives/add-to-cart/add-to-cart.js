'use strict';

app.directive('addToCart', function (Cart, $parse) {
  // Runs during compile
  return {
    link: function(scope, element, attrs, ctrl, transcludeFn) {

      var product = $parse(attrs.addToCart)(scope);

      element.on('click', function(event) {
        event.preventDefault();
        console.log('Added to cart');
        Cart.addProduct(product);
      });
      
    }
  };
});