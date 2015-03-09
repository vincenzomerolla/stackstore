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

app.controller('ProductSearchCtrl', function ($scope, products, categories, Product, Category, $http) {
	$scope.categories = categories;
	$scope.products = products;

	// START OF Quick Fix to populate search filters
	function getContentFromCategory(obj,objCategory) {
		var contentArr = [];
		if (typeof obj[0][objCategory] == 'string') {
			obj.forEach(function (el) {
				if (contentArr.indexOf(el[objCategory]) == -1) {
					contentArr.push(el[objCategory]);
				}
			});
		}
		return contentArr.sort();
	}

	$scope.allPlatforms = getContentFromCategory(products,'platform');
	$scope.allESRBRatings = getContentFromCategory(products,'esrbRating');
	$scope.allNumberOfPlayers = getContentFromCategory(products,'numberOfPlayers');
	// END OF Quick Fix to populate search filters

	$scope.panels = [
		{title: 'Platform', body: $scope.allPlatforms, category: 'platform'},
		{title: 'ESRB Rating', body: $scope.allESRBRatings, category: 'esrbRating'},
		{title: 'Number of Players', body: $scope.allNumberOfPlayers, category: 'numberOfPlayers'}
	];

	$scope.getProductsByFilter = function(item, category) {
		var obj = {};
		obj[category] = item;
		Product.query(obj).$promise.then(function(products) {
			console.log('returned search results', products);
			$scope.products = products;
		});
	};

	// Quick Fix for filtering by category
	$scope.getCategoriesByFilter = function(category) {
		var results = [];
		$scope.products.forEach(function(el) {
			console.log(el);
			el.categories.forEach(function(el2) {
				if (el2 === category.name) results.push(el);
			})
		})
		$scope.products = results;
	}
	// This route is not sending back the right request for some reason
	// $scope.getCategoriesByFilter = function(category) {
	// 	$http.get('/api/categories/' + category._id + '/products/').then(function(response) {
	// 		console.log(response);
	// 		$scope.products = response.data;
	// 	})
	// };

})

