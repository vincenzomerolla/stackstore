app.factory('Cart', function(){
  var STORAGE_ID = 'cart';


  function get() {
    return JSON.parse(sessionStorage.getItem(STORAGE_ID));
  }

  function set(cart) {
    sessionStorage.setItem(STORAGE_ID, JSON.stringify(cart));
  }

  function add(product) {
    var currentCart = get() || {};
    var qty = currentCart[product._id];

    qty = (qty === undefined) ? 0:qty+1;
    set(currentCart);
  }


  function remove(product) {
    var currentCart = get();
    
    if (!get()) return new Error('Cart is empty!');

    var qty = currentCart[product._id];
    if (qty) return new Error('Product not in cart!')

    qty = (qty === undefined) ? 0:qty+1;
    set(currentCart);
  }

  return {
    get: get,
    add: add,
    remove: remove
  }
});