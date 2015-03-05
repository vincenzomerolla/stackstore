var router = require('express').Router();
var Review = require('../../../db/models/review');


router.route('/')
.get(function(req, res, next) {
  Review.find().exec().then(function(reviews) {
    res.json(reviews);
  });
})
module.exports = router;