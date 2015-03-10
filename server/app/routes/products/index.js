var router = require('express').Router();
var Product = require('../../../db/models/product');
var Review = require('../../../db/models/review');
var Promise = require('bluebird');

router.route('/')
.get(function(req, res, next) {
  var query;
  if(req.query.search){
    query = {title: {$regex: new RegExp(req.query.search, "ig")}};
    // console.log(query);
  }
  else{
    query = req.query;
  }
    Product
      .find(query)
      .populate('categories reviews')
      .exec()
      .then(function(products) {
        // console.log(products)
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
  var product;
  Product
    .findById(req.params.id)
    .populate('categories reviews')
    .exec()
    .then(function(p) {
      product = p;
      return Review.populateUser(p.reviews);
    })
    .then(function(r) {
      product.reviews = r;
      res.json(product);
    });
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



router.route('/:id/reviews')
.get(function(req,res,next) {
  Product
    .findById(req.params.id)
    .select('reviews')
    .populate('reviews')
    .exec()
    .then(function(result) {
      return Review.populateUser(result.reviews);
    })
    .then(function(reviews) {
      res.json(reviews);
    })
      
})

.post(function(req, res, next) {
  
  Review.create(req.body)
  .then(function(review) {    
    return Product.findByIdAndAddReview(req.params.id, review).exec();
  })
  .then(function(product) {
    res.sendStatus(201);
  });
 
});


module.exports = router;