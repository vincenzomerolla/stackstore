'use strict';

app.directive('addToCart', function(){
  // Runs during compile
  return {
    restrict: 'E',
    transclude: true,
    //require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    templateUrl: 'js/common/directives/add-to-cart/add-to-cart.html',
    scope: {
      product: '='
    },
    link: function(scope, element, attrs) {
      
    }
  };
});