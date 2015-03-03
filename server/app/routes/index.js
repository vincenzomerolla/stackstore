'use strict';
var router = require('express').Router();

router.use('/products', require('./products/'));


module.exports = router;