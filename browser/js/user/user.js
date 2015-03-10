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


app.controller('userCtrl', function($scope, $state, $http, AuthService, user, User, products, categories) {
  $scope.user = user;
  $scope.products = products;
  $scope.categories = categories;
  $scope.isAuthenticated = AuthService.isAuthenticated();
  $scope.previousOrder;

  if ($scope.isAuthenticated) {
    $http.put('/api/orders', {
      orders: $scope.user.orders
    }).then(function(res) {
      $scope.previousOrder = res.data;
    })
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
      console.log(userUpdate);
    });
  };

  //DEVELOPMENT PURPOSES - REMOVE UPON DEPLOYMENT
  if ($scope.user) {
    $scope.user.isAdmin = true;
  }
});

app.controller('EditableRowCtrl', function($scope, $filter, $http, Product) {

  $scope.statuses = [{
    value: 1,
    text: 'status1'
  }, {
    value: 2,
    text: 'status2'
  }, {
    value: 3,
    text: 'status3'
  }, {
    value: 4,
    text: 'status4'
  }];

  //DEVELOPMENT PURPOSES - REMOVE UPON DEPLOYMENT 
  $scope.products[0].categories[0] = 1;


  $scope.showDataFromArr = function(arr) {
    if (!arr.length) {
      return 'None';
    } else {
      return arr.toString();
    }
  };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {
      id: id
    });
    return $http.post('/saveUser', data);
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
