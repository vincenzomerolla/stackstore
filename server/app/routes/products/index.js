var router = require('express').Router();
var Product = require('../../../db/models/product');


router.route('/')
.get(function(req, res, next) {
  Product.find().exec().then(function(products) {
    res.json(products);
  });
})
.post(function(req, res, next) {
  Product.create(req.body).then(function(product) {
    res.sendStatus(201);
  })
})


router.route('/:id')
.get(function(req, res, next) {
  Product.findById(req.params.id).exec().then(function(product) {
    res.json(product);
  })
})
.put(function(req, res, next) {
  //console.log(req.body)
  Product.findByIdAndUpdate(req.params.id, {$set: req.body }).exec().then(function(product) {
    res.json(product);
  })
})
.delete(function(req, res, next) {
  Product.findByIdAndRemove(req.params.id).exec().then(function(product) {
    res.sendStatus(204);
  })
})


module.exports = router;