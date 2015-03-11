var router = require('express').Router();
var Category = require('../../../db/models/category');
var Product = require('../../../db/models/product');


router.route('/')
.get(function(req, res, next) {
  Category.find().exec().then(function(categories) {
    res.json(categories);
  });
})
.post(function(req, res, next) {
	Category
		.create(req.body)
		.exec()
		.then(function(category) {
			console.log(category);
			res.json(category);
		})
})

module.exports = router;