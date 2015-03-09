var router = require('express').Router();
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

router.get('/:id', function(req, res, next) {
    var promise = request.getAsync({ url: 'http://localhost:3000/'});
    promise.then(function(contents) {
        var body = JSON.parse(contents[1]);

        var output = body[req.params.id];

        return  res.json(output);
    });
});

module.exports = router;