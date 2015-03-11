var router = require('express').Router();
var stripe = require("stripe")("sk_test_CqEJo0MVuOCRmKQwuwgX1oAM");
var mongoose = require('mongoose');
var User = mongoose.model('User');
var PurchasedProduct = mongoose.model('PurchasedProduct');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var Address = mongoose.model('Address');
var Promise = require('bluebird');
var _ = require('lodash');

router.route('/')
.post(function(req, res, next) {
	// Get the credit card details submitted by the form
	var stripeToken = req.body.stripeToken;
	var total = req.body.total;
	var userId = req.body.userId;
	var purchasedproducts =req.body.products;

	var order = new Order();
	
	// console.log(address);

	var charge = stripe.charges.create({
	  amount: total, // amount in cents, again
	  currency: "usd",
	  source: stripeToken,
	  description: order._id.toString()
	}, function(err, charge) {
		console.log(charge)
		if(charge == null){
			res.send("please add to cart")
		}
	  else if (err && err.type === 'StripeCardError') {
	    // The card has been declined
	    res.send("card is declined");
	  }
	  else{
	  	console.log(charge)
	  	var all_products = []
	  	var promises = purchasedproducts.map(function(product){
	  		return Product.findById(product.id).exec();
	  	});

	  	Promise.all(promises)
	  	.then(function(products){
	  		products.forEach(function(product){
	  			var purchasedProduct = new PurchasedProduct();
	  			purchasedProduct.product = product._id;
	  			currentProduct = _.where(purchasedproducts, {'id':product._id.toString()} )[0]
	  			purchasedProduct.quantity = currentProduct.qty;
	  			purchasedProduct.purchasedPrice = currentProduct.purchasePrice;
	  			purchasedProduct.save();
	  			all_products.push(purchasedProduct);
	  		});
	  		return User.findById(userId).exec()
	  	})
	  	.then(function(user){
	  		Address.create(req.body.address).then(function(address){
	  			console.log(address, "Wwwwwwwwwwwwwwwwwwwwwwwwww")
		  		order.products = all_products;
		  		order.shippingAddress = address;
		  		order.save(function(){
		  			user.orders.push(order);
		  			user.save();
				  	res.sendStatus(200);
		  		})
	  		});

	  	});

	  }
	});
})

module.exports = router;