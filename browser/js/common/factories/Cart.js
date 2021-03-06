app.factory('Cart', function(CartItem){
  'use strict';

  var STORAGE_ID = 'cart';
  var cart;

  function Cart(){}
  
  function findProductIndex(product) {
    if (isEmptyCart(cart)) return -1;
    else { 
      var id = product._id || product.id;
      return _.pluck(cart,'id').indexOf(id)
    }
  }

  function isEmptyCart(c) {
    if (!c || _.isEmpty(c)) return true;
    else return false;
  }

  function getCart() {
    cart = JSON.parse(sessionStorage.getItem(STORAGE_ID))
    return cart ? cart.map(CartItem.deserialize) : [];
  }

  function setCart(cart) {
    sessionStorage.setItem(STORAGE_ID, JSON.stringify(cart));
  }

  function addProduct(product) {
    var currentCart = this.get() || [];
    var index = findProductIndex(product);

    if (index === -1) currentCart.push(new CartItem(product));
    else currentCart[index].incrementQty();
    
    setCart(currentCart);
    return currentCart;
  }

  function removeProduct(product) {
    var currentCart = this.get();
    if (!currentCart || _.isEmpty(currentCart)) return new Error('Cart is empty!');

    var index = findProductIndex(product);
    if (index === -1) return new Error('Product not in cart!');

    currentCart.splice(index, 1);
    setCart(currentCart);
    return currentCart;
  }

  function emptyCart() {
    setCart([]);
  }


  function calculateTotal(){
    var total = 0;

    if (!isEmptyCart(cart)) { 
      cart.forEach(function(product){
        total += product.purchasePrice * product.qty;
      })
    }
    return total; //in cents
  }


  Cart.prototype.get = getCart;
  Cart.prototype.addProduct = addProduct;
  Cart.prototype.removeProduct = removeProduct;
  Cart.prototype.empty = emptyCart;
  Cart.prototype.calculateTotal = calculateTotal;


  return new Cart();
});