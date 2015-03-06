'use strict';

app.directive('review', function(){
  // Runs during compile
  return {
    replace: true,
    restrict: 'E',
    //transclude: true,
    //require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    templateUrl: 'js/common/directives/review/review.html',
    scope: {
      review: '=content'
    },
    link: function(scope, element, attrs, ctrl, transcludeFn) {

      
      
    }
  };
});