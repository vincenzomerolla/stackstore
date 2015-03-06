var mongoose = require('mongoose')
var router = require('express').Router();
var User = mongoose.model('User');

router.route('/').post(function(req,res,next){
	console.log(req.body)
	var user = new User(req.body);
	user.save(function(err){
		if(err) next(err);
		res.sendStatus(200);
	})
});

module.exports = router