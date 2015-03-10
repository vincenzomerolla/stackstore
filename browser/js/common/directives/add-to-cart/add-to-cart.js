'use strict';

app.directive('addToCart', function (Cart, Product, $q, $parse) {
  // Runs during compile
  return {
    link: function(scope, element, attrs, ctrl, transcludeFn) {

      var product = $parse(attrs.addToCart)(scope);

      
      if (!product.isAvailable || product.inventory === 0) {
        var heading, parent = element.parent();

        if (!product.isAvailable) {
          heading = angular.element('<h6 class="text-muted text-center" ><i class="fa fa-times-circle-o"></i> Currently Unavailable</h6>');
          element.remove();
          parent.append(heading); 
        } else {
          heading = angular.element('<h6 class="text-danger text-center"><i class="fa fa-times-circle-o"></i> Out of stock</h6>');
          element.remove();
          parent.append(heading);
        }
        return;
      }

      element.on('click', function(event) {
        event.preventDefault();
        console.log('Added to cart');

        Product.get({_id: product._id}).$promise.then(function(product) {
          if (product.isAvailable) {
            console.log(product.inventory)
            
            if (product.inventory > 0) {
              var newInventory = product.inventory-1;
              return Product.update({_id: product._id}, {inventory: newInventory}).$promise;
            } else {
              return $q.reject('Out of stock')
            }
          } else {
            return $q.reject('Currently unavailable');
          }
        })
        .then(function() {
          swal({
            title: 'Added!',
            text: 'Successfully added to cart.',
            type: 'success',
            timer: 3000
          });

          Cart.addProduct(product);
        })
        .catch(function(err) {
          swal({
            title: 'Cannot add!',
            text: err,
            type: 'error',
            timer: 2000
          });
        })

          
      });
      
    }
  };
});