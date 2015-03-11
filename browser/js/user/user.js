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
      // allUsers: function(User) {
      //   return User.query().$promise;
      // }
    }
  });
});


app.controller('userCtrl', function($scope, $state, $http, AuthService, user, User, products, Product, categories) {
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
  // $scope.allUsers = allUsers;
  console.log($scope.allUsers);
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

  $scope.activeTab = 0;

  // Making new Product
  // $scope.newProduct = new Product();

  $scope.createProduct = function () {
    console.log('Creating new product')
    console.log($scope.newProduct);

    return Product.save({},$scope.newProduct)
      .then(function(product) {
        return Product.query().$promise;
      })
      .then(function(products) {
        $scope.products = products;
      })
  };

  //Authentication
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

app.controller('EditableRowCtrl', function($scope, $filter, $http, Product, Category, User) {

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

  $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
        $scope.groups = data;
      });
    };

    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.groupName || 'Not set';
      }
    };

////////////// Categories
  $scope.createCategory = function(data) {
    // return Category.$save({},data).$promise.then(function(category) {
    //   return Category.query().$promise;
    // })
    // .then(function(categories) {
    //   $scope.categories = categories;
    // })
    
    // return $http.post('/categories').$promise.then(function(category) {
    //   console.log('posted new category',category);
    //   return $http.get('/categories').$promise;
    // })
    // .then(function(categories) {
    //   $scope.categories = categories;
    // })
    angular.extend(data, {id: id});
    return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.newCategory = new Category();
    console.log($scope.newCategory);
    $scope.newCategory.name = 'INSERT NEW NAME';
    $scope.categories.push($scope.newCategory);
  };

//////////// Users

});
