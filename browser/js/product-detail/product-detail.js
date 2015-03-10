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
          user: function(AuthService) {
            return AuthService.getLoggedInUser().then(function(user) {
              return user;
            });
          }
        }
    });

});

app.controller('ProductsDetailCtrl', function ($scope, $sce, $stateParams, product, user, ProductReview) {
  
  $scope.product = product;
  $scope.activeTab = 0;
  $scope.isLoggedIn = !!user;


  function resetReview() {
    $scope.newReview = new ProductReview();
    if ($scope.isLoggedIn) $scope.newReview.user = user._id;
    console.log($scope.newReview);
    //$scope.reviewForm.$setPristine();
    return true;
  }

  resetReview();

  $scope.submitReview = function(review) {
    console.log('Submitting review')

    return $scope.newReview.$save($stateParams)
      .then(function(review) {
        console.log(review);
        return ProductReview.query($stateParams).$promise;
      })
      .then(function(reviews) {
        $scope.product.reviews = reviews;
        return resetReview();
      }); 
  };

  $scope.navigatedAway = resetReview;

});


