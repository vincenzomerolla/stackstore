'use strict';
app.config(function ($stateProvider) {
	
	$stateProvider.state('product-search', {
		url: '/products',
		controller: 'ProductSearchCtrl',
		templateUrl: 'js/product-search/product-search.html'
	});

});

app.controller('ProductSearchCtrl', function ($scope, Product, Category) {
	Product.query().$promise.then(function(products) {
		$scope.products = products;
	});

	Category.query().$promise.then(function(categories) {
		$scope.categories = categories;
		console.log(categories);
	})
})

