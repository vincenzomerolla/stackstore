var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var engine = require('../engine/app.js');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var promise = request.getAsync({ url: 'http://localhost:1337/api/products'});
    promise.then(function(contents) {
        var body = JSON.parse(contents[1]);

        var output = engine.recommend(body);

        res.json(output);

    });
});


module.exports = router;

