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

	// START OF Quick Fix to populate search filters
	function getContentFromCategory(obj,objCategory) {
		var contentArr = [];
		if (typeof obj[0][objCategory] == 'string') {
			obj.forEach(function (el) {
				if (contentArr.indexOf(el[objCategory]) == -1) {
					if (el[objCategory] === null) contentArr.push('Other')
					else contentArr.push(el[objCategory]);
				}
			});
		}
		var newContentArr = contentArr.map(function(el) {
			return {name: el};
		})
		return newContentArr;
	}

	$scope.allPlatforms = getContentFromCategory(products,'platform');
	$scope.allESRBRatings = getContentFromCategory(products,'esrbRating');
	$scope.allNumberOfPlayers = getContentFromCategory(products,'numberOfPlayers');
	// END OF Quick Fix to populate search filters

	$scope.panels = [
		{title: 'Categories', body: $scope.categories, category: 'categories'},
		{title: 'Platform', body: $scope.allPlatforms, category: 'platform'},
		{title: 'ESRB Rating', body: $scope.allESRBRatings, category: 'esrbRating'},
		{title: 'Number of Players', body: $scope.allNumberOfPlayers, category: 'numberOfPlayers'}
	];

	$scope.getProductsByFilter = function(item, category) {
		var obj = {};
		console.log(category);
		obj[category] = item.name;
		Product.query(obj).$promise.then(function(products) {
			console.log('returned search results', products);
			$scope.products = products;
		});
	}

})

