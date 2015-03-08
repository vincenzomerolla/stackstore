'use strict';

app.factory('ProductReview', function($resource){
  return $resource('/api/products/:productId/reviews/:reviewId', {
    'productId':'@_id',
    'reviewId':'@_id'
  }, {
    update: {
      method: 'PUT'
    }
  })
});