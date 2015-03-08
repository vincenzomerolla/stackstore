app.factory('Cart', function(CartItem){
  'use strict';

  var STORAGE_ID = 'cart';

  var Cart = (function () {

    var cart;

    function Cart(){}
    
    function findProduct(product) {
      if (!cart || _.isEmpty(cart)) return -1;
      else return _.pluck(cart,'id').indexOf(product._id);
    }


    function getCart() {
      cart = JSON.parse(sessionStorage.getItem(STORAGE_ID))
      return cart ? cart.map(CartItem.deserialize) : [];
    }

    function setCart(cart) {
      sessionStorage.setItem(STORAGE_ID, JSON.stringify(cart));
    }

    function addProduct(product) {
      var currentCart = getCart() || [];
      var index = findProduct(product);

      if (index === -1) currentCart.push(new CartItem(product));
      else currentCart[index].incrementQty();
      
      setCart(currentCart);
      return currentCart;
    }

    function removeProduct(product) {
      var currentCart = getCart();
      if (!currentCart || _.isEmpty(currentCart)) return new Error('Cart is empty!');

      var index = findProduct(product);
      if (index === -1) return new Error('Product not in cart!');

      currentCart.splice(index, 1);
      setCart(currentCart);
      return currentCart;
    }

    function emptyCart() {
      setCart([]);
    }


    Cart.prototype.get = getCart;
    Cart.prototype.addProduct = addProduct;
    Cart.prototype.removeProduct = removeProduct;
    Cart.prototype.empty = emptyCart;

    console.log(Cart)

    return Cart;    
  })(); 


  return new Cart();
});