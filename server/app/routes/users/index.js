var mongoose = require('mongoose')
var router = require('express').Router();
var User = mongoose.model('User');

router.route('/')
.post(function(req,res,next){
	console.log(req.body)
	var user = new User(req.body);
	user.save(function(err){
		if(err) next(err);
		res.sendStatus(200);
	})
});

router.route('/:id')
.put(function(req,res,next){
	console.log("req.body",req.body);

	User
		.findByIdAndUpdate(req.params.id, {$set: req.body })
		.exec()
		.then(function (response) {
			console.log("response",response);
			res.sendStatus(204);
		})
})
.post(function(req,res,next){
	console.log(req.body);

	User
		.findOne({_id: req.params.id})
		.exec()
		.then(function (response) {
			// if (response.)
		})

})

module.exports = router;