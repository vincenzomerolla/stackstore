'use strict';

app.directive('review', function(){
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'js/common/directives/review/review.html',
    scope: {
      review: '=content'
    },
    link: function(scope, element, attrs, ctrl, transcludeFn) {

      
      
    }
  };
});