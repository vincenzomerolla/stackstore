app.factory('CartItem', function() {
  'use strict';
  
  function CartItem(product) {
    this.id; 
    this.purchasePrice;
    this.image;
    this.title;
    
    if (product) {
      this.id = product._id;
      this.title = product.title;
      this.image = product.image;
      this.purchasePrice = product.price;
      this.qty = 1;
    }
  }

  CartItem.prototype.incrementQty = function() {
    this.qty++;
  };

  CartItem.prototype.decrementQty = function() {
    if (this.qty) this.qty--;
  };

  CartItem.deserialize = function (obj) {
    var item = new CartItem();
    Object.keys(obj).forEach(function(key) {
      item[key] = obj[key];
    })
    return item;
  }

  return CartItem;
})