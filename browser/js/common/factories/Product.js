'use strict';

app.factory('Product', function($resource){
  return $resource('/api/products/:_id', {}, {
    update: {
      method: 'PUT'
    }
  })
});