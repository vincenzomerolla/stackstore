'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('products-detail', {
        url: '/products/:_id',
        controller: 'ProductsDetailCtrl',
        templateUrl: 'js/products-detail/products-detail.html'
    });

});

app.controller('ProductsDetailCtrl', function ($scope, $stateParams, Product) {
  Product.get().$promise.then(function(product) {
    $scope.product = product;
  })
});


