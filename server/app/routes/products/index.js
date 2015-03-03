var router = require('express').Router();
var Product = require('../../../db/models/product');
var Category = require('../../../db/models/category');


router.route('/')
.get(function(req, res, next) {
  Product.find().exec().then(function(products) {
    res.json(products);
  });
})
.post(function(req, res, next) {
  var product = new Product(req.body);

  product.save(function(err, product) {
    if (err) next(err);

    

    res.sendStatus(201);
  })
})


router.route('/:id')
.get(function(req, res, next) {
  Product
    .findById(req.params.id)
    .populate('categories reviews')
    .exec()
    .then(function(product) {
      res.json(product);
    })
})
.put(function(req, res, next) {
  //console.log(req.body)
  Product
    .findByIdAndUpdate(req.params.id, {$set: req.body })
    .populate('categories reviews')
    .exec()
    .then(function(product) {
      res.json(product);
    })
})
.delete(function(req, res, next) {
  Product.findByIdAndRemove(req.params.id).exec().then(function(product) {
    res.sendStatus(204);
  })
})


module.exports = router;