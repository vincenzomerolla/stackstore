var router = require('express').Router();
var stripe = require("stripe")("sk_test_CqEJo0MVuOCRmKQwuwgX1oAM");

router.route('/')
.post(function(req, res, next) {
	// Get the credit card details submitted by the form
	var stripeToken = req.body.stripeToken;
	var total = req.body.total;

	var charge = stripe.charges.create({
	  amount: total, // amount in cents, again
	  currency: "usd",
	  source: stripeToken,
	  description: "payinguser@example.com"
	}, function(err, charge) {
	  if (err && err.type === 'StripeCardError') {
	    // The card has been declined
	    res.send("card is declined");
	  }
	  else if(charge.status == "succeeded"){
	  	console.log(total +"cents is charged")
	  	res.send(total + "cents is received")
	  	// res.redirect("/user");
	  }
	});
})

module.exports = router;