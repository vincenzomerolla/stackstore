var router = require('express').Router();
var Product = require('../../../db/models/product');
var Review = require('../../../db/models/review');


router.route('/')
.get(function(req, res, next) {
  var promise;
  console.log(req.query);

  if (req.query.category) {
    promise = Product.find().where('categories').in([req.query.category]).exec();
  }
  else {
    promise = Product.find(req.query).populate('categories reviews').exec();
  }

  promise.then(function(products) {
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

router.route('/:id/')

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



router.route('/:id/reviews')
.get(function(req,res,next) {
  Product
    .findById(req.params.id)
    .populate('reviews')
    .exec()
    .then(function(product) {
      res.json(product.reviews);
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