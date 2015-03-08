app.factory('CartItem', function() {
  'use strict';
  
  function Item(product) {
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

  Item.prototype.incrementQty = function() {
    this.qty++;
  };

  Item.prototype.decrementQty = function() {
    if (this.qty) this.qty--;
  };

  Item.deserialize = function (obj) {
    var item = new Item();
    Object.keys(obj).forEach(function(key) {
      item[key] = obj[key];
    })
    return item;
  }

  return Item;
})