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
			var options = {
				path: 'products.product',
				model : 'Product'
			}
			if(err) next(err);
			Order.populate(data,options,function(err,result){
				res.json(result);
			});
		});
});


module.exports = router;
