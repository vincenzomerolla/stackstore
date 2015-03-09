'use strict'

app.factory('User', function($resource) {
	return $resource('/api/users/:id', {}, {
		update: {
			method: 'PUT'
		}
	})
})