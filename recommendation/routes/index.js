var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var engine = require('../engine/app.js');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var url;
    if (process.env.NODE_ENV = 'production') {
      url = 'http://nameless-ocean-4509.herokuapp.com';
    } else {
      url = 'http://localhost:1337';
    }


    var promise = request.getAsync({ url: url + '/api/products'});
    promise.then(function(contents) {
        var body = JSON.parse(contents[1]);

        var output = engine.recommend(body);

        res.json(output);

    });
});


module.exports = router;

