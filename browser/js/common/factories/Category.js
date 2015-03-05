'use strict';

app.factory('Category', function($resource){
  return $resource('/api/categories/:_id', {}, {
    update: {
      method: 'PUT'
    }
  })
});