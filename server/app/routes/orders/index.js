var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');


router.route('/')
.put(function(req, res, next) {
	Order.find({"_id" : { $in: req.body.orders}})
		.lean()
		.populate({path : 'products'})
		.exec(function(err,data){
			res.json(data);
			// var options = {
			// 	path: 'products.product',
			// 	model : 'Product'
			// }
			// // console.log(data[0].products[1].product)
			// // Product.find({_id: data[0].products[0].product},function(err,data){console.log(data)})
			// if(err) next(err);
			// Order.populate(data,options,function(err,result){
			// 	// console.log(result[0].products);
			// 	res.json(result);
			// });
		});
	// Order.find({"_id" : { $in: req.body.orders}})
	// 	.populate({path : 'products'})
	// 	.populate({path: 'product'})
	// 	.exec(function(err,data){
	// 		console.log(data);
	// 	});
})


module.exports = router;
