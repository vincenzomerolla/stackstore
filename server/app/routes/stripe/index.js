var router = require('express').Router();
var stripe = require("stripe")("sk_test_CqEJo0MVuOCRmKQwuwgX1oAM");
var mongoose = require('mongoose');
var User = mongoose.model('User');
var PurchasedProduct = mongoose.model('PurchasedProduct');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var Promise = require('bluebird');
var _ = require('lodash');

router.route('/')
.post(function(req, res, next) {
	// Get the credit card details submitted by the form
	var stripeToken = req.body.stripeToken;
	var total = req.body.total;
	var userId = req.body.userId;
	var purchasedproducts =JSON.parse(req.body.products);


	// Product.findById("54f744379b495eb8705c4cf3",function(err,data){
	// 	console.log("find this",err,data)
	// })

	var all_products = []
	var promises = purchasedproducts.map(function(product){
		return Product.findById(product.id).exec();
	});

	Promise.all(promises)
	.then(function(products){
		products.forEach(function(product){
			var purchasedProduct = new PurchasedProduct();
			purchasedProduct.product = product._id;
			// console.log("this is it", purchasedproducts , _.where(purchasedproducts, {'id':product._id.toString()} ) ) ;
			currentProduct = _.where(purchasedproducts, {'id':product._id.toString()} )[0]
			console.log(_.where(purchasedproducts, {'id':product._id.toString()} ),currentProduct.qty,currentProduct.purchasedPrice)
			purchasedProduct.quantity = currentProduct.qty;
			purchasedProduct.purchasedPrice = currentProduct.purchasePrice;
			purchasedProduct.save();
			all_products.push(purchasedProduct);
		});
		return User.findById(userId).exec()
	})
	.then(function(user){
		var order = new Order({products : all_products});
		order.save(function(){
			user.orders.push(order);
			user.save();
		})
	});


	// PurchasedProduct.find().populate('products._id').exec().then(function(data){console.log(data)})


	res.redirect('/user')

	// var charge = stripe.charges.create({
	//   amount: total, // amount in cents, again
	//   currency: "usd",
	//   source: stripeToken,
	//   description: "payinguser@example.com"
	// }, function(err, charge) {
	//   if (err && err.type === 'StripeCardError') {
	//     // The card has been declined
	//     res.send("card is declined");
	//   }
	//   else if(charge.status == "succeeded"){
	//   	console.log(total +"cents is charged")
	//   	res.send(total + "cents is received")
	//   	// res.redirect("/user");
	//   }
	// });
})

module.exports = router;