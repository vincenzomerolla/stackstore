'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('product-detail', {
        url: '/products/:_id',
        controller: 'ProductsDetailCtrl',
        templateUrl: 'js/product-detail/product-detail.html',
        resolve: {
          product: function($stateParams, Product) {
            return Product.get($stateParams).$promise;
          }
        }
    });

});

app.controller('ProductsDetailCtrl', function ($scope, $sce, product) {
  
  $scope.product = product;


  $scope.tabs = [
    {
      title: 'Description',
      content: $sce.trustAsHtml($scope.product.description)
    },
    {
      title: 'Reviews',
      content: $sce.trustAsHtml('<h1>here go the reviews.</h1>')
    },
    {
      title: 'Related Products',
      content: $sce.trustAsHtml('<img class="img-responsive" src="//placehold.it/350x150"/>')
    }
  ];
  $scope.tabs.activeTab = 0;


});


