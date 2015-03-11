'use strict';
app.config(function($stateProvider) {

  $stateProvider.state('user', {
    url: '/user',
    controller: 'userCtrl',
    templateUrl: 'js/user/user.html',
    resolve: {
      user: function(AuthService) {
        return AuthService.getLoggedInUser();
      },
      products: function(Product) {
        return Product.query().$promise;
      },
      categories: function(Category) {
        return Category.query().$promise;
      }
    }
  });
});



app.controller('userCtrl', function($rootScope,Session,$scope, $state, $http, AuthService, user, User, products, categories, AUTH_EVENTS) {
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

  $scope.user = user;
  $scope.products = products;
  $scope.categories = categories;
  $scope.isAuthenticated = AuthService.isAuthenticated();
  $scope.previousOrder;
  $scope.manufacturers = getContentFromCategory($scope.products,'manufacturer');
  $scope.platforms = getContentFromCategory($scope.products,'platform');
  $scope.esrbRatings = getContentFromCategory($scope.products,'esrbRating');
  $scope.numberOfPlayers = getContentFromCategory($scope.products,'numberOfPlayers');
  $scope.categoriesArr = categories.map(function(el) {
    return el.name;
  });

  $rootScope.$on(AUTH_EVENTS.loginSuccess,function(){
    $scope.isAuthenticated = AuthService.isAuthenticated();
  });

  if ($scope.isAuthenticated) {
    $http.put('/api/orders', {
      orders: $scope.user.orders
    }).then(function(res) {
      $scope.previousOrder = res.data;
    })
  }

  $scope.getOrders = function(){
    
  }

  $scope.logout = function() {
    AuthService.logout();
    console.log("logging out")
    $state.go('home');
  }

  $scope.activeTab = 0;

  $scope.checkFieldIfEmpty = function(data) {
    if (data.length === 0) {
      return 'This field can\'t be blank';
    }
  };

  $scope.updateUser = function() {
    User.update({
      id: $scope.user._id
    }, $scope.user).$promise.then(function(userUpdated) {
      console.log(userUpdated);
    });
  };


  //DEVELOPMENT PURPOSES - REMOVE UPON DEPLOYMENT
  if ($scope.user) {
    $scope.user.isAdmin = true;
  }
});

app.controller('EditableRowCtrl', function($scope, $filter, $http, Product) {

  //DEVELOPMENT PURPOSES - REMOVE UPON DEPLOYMENT 
  $scope.products[0].categories[0] = 1;


  $scope.showDataFromArr = function(arr) {
    if (!arr.length) {
      return 'None';
    } else {
      return arr.toString();
    }
  };

  // remove user
  $scope.updateItem = function(tableData, itemId) {
    // Update item
    console.log("tableData",tableData);
    console.log(itemId);

    Product.update({_id: itemId},tableData).$promise.then(function(response) {
      console.log(response);
      return Product.query().$promise;
    })
    // Retrieve all items again
    .then(function(updatedItems) {
      $scope.products = updatedItems;
    })
    return true;
  };

});
