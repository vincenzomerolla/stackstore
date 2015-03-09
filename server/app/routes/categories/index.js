var router = require('express').Router();
var Category = require('../../../db/models/category');
var Product = require('../../../db/models/product');


router.route('/')
.get(function(req, res, next) {
  Category.find().exec().then(function(categories) {
    res.json(categories);
  });
})

// router.route('/:id/products') 
// .get(function(req, res, next) {
  // Category
	 //  .findById(req.params.id)
	 //  .exec()
	 //  .then(function(category) {
	 //  	console.log(category)
	 //    return Product
		//     .find({})
		//     .populate('categories')
		//     .where('categories')
		//     .in([category._id])
		//     .exec() 
	 //  })
	 //  .then(function(response) {
		// 	    	res.json(response);
		//     	})
// })

module.exports = router;