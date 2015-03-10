'use strict';

app.factory('ProductReview', function($resource){
  return $resource('/api/products/:_id/reviews/', {}, 
  {
    update: {
      method: 'PUT'
    }
  })
});