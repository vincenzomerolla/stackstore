'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        controller: 'checkoutCtrl',
        templateUrl: 'js/checkout/checkout.html'
    });
});

app.controller("checkoutCtrl",function($scope,Cart,Session){
	// console.log(Cart.getCart())
	console.log(Session.user)
	$scope.list_of_products = Cart.get();

	$scope.calculateTotal = function(){
		var total = 0;
		$scope.list_of_products.forEach(function(product){
			total += product.purchasePrice * product.qty;
		})
		return total //in cents
	}

	$scope.total = $scope.calculateTotal();

	$scope.modal = {
		"title":"Pay with Credit Card",
		"content": $scope.total/100
	}
	//##########################################################
	//Stripe codes
	Stripe.setPublishableKey('pk_test_80RLXWzoQSYUnhUNJJaKeUiN');

	$scope.submitPayment = function(){
	    var $form = $('#payment-form');
	    Stripe.card.createToken($form, stripeResponseHandler);

		function stripeResponseHandler(status, response) {
		  var $form = $('#payment-form');

		  if (response.error) {
		    // Show the errors on the form
		    $form.find('.payment-errors').text(response.error.message);
		    $form.find('button').prop('disabled', false);
		  } else {
		    // response contains id and card, which contains additional card details
		    var token = response.id;
		    // Insert the token into the form so it gets submitted to the server
		    //add stripeToken
		    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
		    //add total amount to be paid
		    $form.append($('<input type="hidden" name="total" />').val($scope.total));
		    //append userId
		    $form.append($('<input type="hidden" name="userId" />').val(Session.user._id));
		    //append products being paid
		    $form.append($('<input type="hidden" name="products" />').val(JSON.stringify($scope.list_of_products)));
		    //submit
		    Cart.empty();
		    $form.get(0).submit();
		  }
		};
	};

	//#########################################################
});