var router = require('express').Router();
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var Product = require('../../../db/models/product');

router.get('/:id', function(req, res, next) {
    var url;
    if (process.env.NODE_ENV === 'production') {
      url = 'http://stackstore.herokuapp.com/';
    } else {
      url = 'http://localhost:3000/';
    }

    var promise= request.getAsync({ url: url});
    promise.then(function(contents) {
        var body = JSON.parse(contents[1]);

        var output = body[req.params.id];

        var promises = output.map(function(id){
            return Product.findById(id).exec()
        });

        Promise.all(promises).then(function(products){
            res.json(products)
        });
    });
});

module.exports = router;