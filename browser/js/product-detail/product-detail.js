'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('product-detail', {
        url: '/products/:_id',
        controller: 'ProductsDetailCtrl',
        templateUrl: 'js/product-detail/product-detail.html'
    });

});

app.controller('ProductsDetailCtrl', function ($scope, $stateParams, Product) {
  Product.get($stateParams).$promise.then(function(product) {
    $scope.product = product;
  })
});


