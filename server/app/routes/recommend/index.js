var router = require('express').Router();
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var Product = require('../../../db/models/product');

router.get('/:id', function(req, res, next) {
    var promise = request.getAsync({ url: 'http://localhost:3000/'});
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