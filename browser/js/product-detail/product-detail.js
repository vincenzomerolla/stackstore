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
          },
            
        }
    });

});

app.controller('ProductsDetailCtrl', function ($scope, $sce, product, isLoggedIn, ProductReview) {
  
  $scope.product = product;
  $scope.activeTab = 0;
  $scope.isLoggedIn = isLoggedIn;

  var newReview = $scope.newReview = {};

  function resetReview() {
    $scope.newReview = new ProductReview();
    //$scope.reviewForm.$setPristine();
    return true;
  }

  $scope.submitReview = function(review) {
    console.log('Submitting review')

    return ProductReview.save(newReview).$promise
      .then(function(review) {
        console.log(review);
        return ProductReview.query().$promise;
      })
      .then(function(reviews) {
        $scope.product.reviews = reviews;
        return resetReview();
      }); 
  };

  $scope.navigatedAway = resetReview;

});


