var router = require('express').Router();
var stripe = require("stripe")("sk_test_CqEJo0MVuOCRmKQwuwgX1oAM");

router.route('/')
.post(function(req, res, next) {
	console.log("hi",req.body,req.token)
	res.send("hi")
	// Set your secret key: remember to change this to your live secret key in production
	// See your keys here https://dashboard.stripe.com/account

	// (Assuming you're using express - expressjs.com)
	// Get the credit card details submitted by the form
	var stripeToken = request.body.stripeToken;

	var charge = stripe.charges.create({
	  amount: 1000, // amount in cents, again
	  currency: "usd",
	  source: stripeToken,
	  description: "payinguser@example.com"
	}, function(err, charge) {
	  if (err && err.type === 'StripeCardError') {
	    // The card has been declined
	  }
	});
})

// router.route('/')
// .get(function(req, res, next) {
// 	res.send("hi")
// })

module.exports = router;