'use strict';
app.config(function ($stateProvider) {
	
	$stateProvider.state('product-search', {
		url: '/products',
		controller: 'ProductSearchCtrl',
		templateUrl: 'js/product-search/product-search.html',
		resolve: {
			products: function(Product) {
				return Product.query().$promise;
			},
			categories: function(Category) {
				return Category.query().$promise;
			}
		}
	});
});

app.controller('ProductSearchCtrl', function ($scope, products, categories, Product) {
	$scope.categories = categories;
	$scope.products = products;

	$scope.panels = [
		{title: 'Categories', body: $scope.categories},
		{title: 'Platform', body: ''},
		{title: 'ESRB Rating', body: ''},
		{title: 'Number of Players', body: ''}
	];
	$scope.panels.activePanel = 0;

	$scope.getProductsByFilter = function(item) {
		Product.query({category: item._id}).$promise.then(function(products) {
			console.log(products);
			$scope.products = products;
		});
	}

})

