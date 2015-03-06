'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('product-detail', {
        url: '/products/:_id',
        controller: 'ProductsDetailCtrl',
        templateUrl: 'js/product-detail/product-detail.html',
        resolve: {
          product: function($stateParams, Product) {
            return Product.get($stateParams).$promise;
          },
          isLoggedIn: function(AuthService) {
            return AuthService.getLoggedInUser().then(function(user) {
              return !!user;
            });
          }
        }
    });

});

app.controller('ProductsDetailCtrl', function ($scope, $sce, product, isLoggedIn) {
  
  $scope.product = product;
  $scope.activeTab = 0;
  $scope.isLoggedIn = isLoggedIn;
  console.log(isLoggedIn)

});


