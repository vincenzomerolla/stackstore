var router = require('express').Router();
var Review = require('../../../db/models/review');
//var Category = require('../../../db/models/category');


router.route('/')
// .get(function(req, res, next) {
//   Review.find().exec().then(function(reviews) {
//     res.json(reviews);
//   });
// })
.post(function(req, res, next) {
  var review = new Review(req.body);
  //review.user = req.user._id;
  
  review.save(function(err, review) {
    if (err) next(err);
    res.sendStatus(201);
  })
})